import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { config } from 'dotenv';
config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';


const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log("Email", email);
        console.log("Password ", password);
        const user = await User.findOne({ email });

        console.log("User", user);
        if (!user) {
            res.status(400).json({ message: "Credenciales incorrectas" });
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.status(400).json({ message: "Credenciales incorrectas" });
            return;
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            age: user.age,
        }

        const token = jwt.sign(tokenData, JWT_SECRET, { expiresIn: '15m' });
        res.cookie('authToken', token, { httpOnly: true, secure: true }).json(
            { 
                token,
                tokenData,
            }
        );

    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie('authToken').json({ message: "Sesión cerrada" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export { login, logOut }

