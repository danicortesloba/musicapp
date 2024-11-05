
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';


const authenticateJWT = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Acceso denegado: Token inválido' });
        }

        req.user = payload.id; 
        req.name = payload.name;
        req.lastname = payload.lastname;
        req.email = payload.email;
        req.age = payload.age;

        next(); 
    });
};

const checkIdentification = (req, res, next) => {
    if (req.user !== req.params.id) {
        return res.status(403).json({ message: 'Acceso denegado: Token inválido' });
    }
    next();
};

export { authenticateJWT, checkIdentification };