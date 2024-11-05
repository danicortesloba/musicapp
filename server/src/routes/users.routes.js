import { authenticateJWT, checkIdentification } from "../middlewares/jwt.middleware.js";
import { getAllUsers, getOneUser, createUser, getUserByEmail, deleteUser, updateUser } from "../controllers/users.controller.js";
import { Router } from 'express';

const userRouter = Router ();


userRouter.route('/users')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/users/find/:email')
    .get(getUserByEmail)

userRouter.route('/users/:id')
    .get(getOneUser)


userRouter.delete('/users/:id', authenticateJWT, checkIdentification, deleteUser)

userRouter.put('/users/:id', authenticateJWT, checkIdentification, updateUser)


    export default userRouter