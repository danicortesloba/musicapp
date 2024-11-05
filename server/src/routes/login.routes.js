import { Router } from 'express';
import { login, logOut } from '../controllers/login.controller.js';


const loginRouter = Router();


loginRouter.post('/login', login)
loginRouter.get('/logout', logOut)
export default loginRouter;
