import express from 'express'
import { PORT } from './config/config.js'
import { infoUser, patchUser, resgiterUser, validarUser } from './controllers/routers.controller.js'
import { pool } from './config/db.js'
import { fotoPerfil } from './multers/multer.js'
import { authenticateToken, corsPermit } from './middleware/authentic.js'

const app = express()
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/myprofile', authenticateToken ,infoUser)

app.post('/', validarUser)

app.post('/register', resgiterUser)

app.patch('/editinfo', fotoPerfil.single('perfilPhoto') ,patchUser)


app.post('/protected', authenticateToken)

app.listen(PORT, ()=> console.log(`server running in http://localhost:${PORT}`))
