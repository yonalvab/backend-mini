import { pool } from "../config/db.js" 
import { SECRET_KEY } from "../config/config.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const validarUser = async ( req, res ) =>{
    const {email, password} = req.body

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? ', [email])
        console.log('Datos recibidos:', req.body);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'No hay una cuenta relacionada con este email o contraseña' });
        }

        const contrasenahasheada = rows[0].password
        const isPasswordValid = await bcrypt.compare(password, contrasenahasheada);
        if (isPasswordValid) {
            delete rows[0].password 
        }
        const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token, data: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const resgiterUser = async (req, res) => {
    const {email, password } = req.body
    /* const perfilPhoto = req.file ? req.file.filename : null */

    if (!email || !password ) {
        return res.status(400).json({
            message: 'Rellena todos los campos obligatorios'
        })
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'Este email no es valido'
        })
    }

    if ((password.length < 8)) {
        return res.status(400).json({
            message: 'Se requiere minimo 8 caracteres '
        })
    }
    
    const tieneUpperCase = /[A-Z]/.test(password);
    if (!tieneUpperCase) {
        return res.status(400).json({
            message: 'La contraseña debe contener al menos una letra mayúscula'
        });
    }

    try {

        const saltRounds = 10;
        const hashearPassword = await bcrypt.hash(password, saltRounds);

        const [rows] = await pool.query('INSERT INTO usuarios (email, password) VALUES (?, ?)',[email, hashearPassword])

        res.send({
            id:rows.insertId,
            email,
        })
    } catch (error) {
        console.error('Error al crear el usuario', error)
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const patchUser = async (req, res) => {
    const { authorization } = req.headers

    const {id} = jwt.verify(authorization, SECRET_KEY)

    const { email, password, name, biografy, phone } = req.body;
    const perfilPhoto = req.file ? req.file.filename : null;

    if(Object.keys(req.body).length === 0){
        return res.status(400).json({ message: 'No hay datos para actualizar' })
    }

    if (email && !email.includes('@')) {
        return res.status(400).json({
            message: 'Este email no es válido'
        });
    }

    if (password && password.length < 8) {
        return res.status(400).json({
            message: 'Se requiere mínimo 8 caracteres'
        });
    }

    try {
        // Construir la consulta dinámicamente
        const fields = [];
        const values = [];

        if (email) {
            fields.push('email');
            values.push(email);
        }
        if (password) {
            const hash = await bcrypt.hash(password, 10)
            fields.push('password');
            values.push(hash);
        }
        if (name) {
            fields.push('name');
            values.push(name);
        }
        if (biografy) {
            fields.push('bio');
            values.push(biografy);
        }
        if (phone) {
            fields.push('phone');
            values.push(phone);
        }
        if (perfilPhoto) {
            fields.push('image');
            values.push(perfilPhoto);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: 'No se proporcionó ninguna información para actualizar'
            });
        }


        const itemsActualizados = fields.map(field => `${field} = ?`).join(', ')
        const coleccionUpdate = `UPDATE usuarios SET ${itemsActualizados} WHERE id = ?`;
        const [result] = await pool.query(coleccionUpdate, [...values, id]);

        if (result.affectedRows === 1) {
            return res.json({
                message: 'Usuario actualizado'
            });
        }

        
    } catch (error) {
        console.error('Error al actualizar el usuario', error);
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
};

export const infoUser = async (req, res) => {
    const { authorization } = req.headers

    const {id} = jwt.verify(authorization, SECRET_KEY)
    const [user] = await pool.query('SELECT id, email, name, bio, phone, image FROM usuarios WHERE id = ?', [id])

    res.json(user[0])
}
