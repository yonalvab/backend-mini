import { SECRET_KEY, corsPermitidos } from "../config/config.js"
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    
    try {
        const { authorization } = req.headers
    
        if (!authorization) return res.status(403).json({ message: 'Envía un token' })
    
        jwt.verify(authorization, SECRET_KEY)
        next()
      } catch (error) {
        return res.status(500).json({ message: 'Error interno' })
      }
};

/* export const corsPermit = (req, res, next) => {
    const {origin} = req.headers
  
  
    if (corsPermitidos) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
      next()
    } else {
      return res.status(403).json({ message: 'CORS ERROR'})
    }
} */