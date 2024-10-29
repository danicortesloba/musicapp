import { getAllUsers, getOneUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { Router } from 'express';

const userRouter = Router ();


userRouter.route('/users')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/users/:id')
    .get(getOneUser)
    .patch(updateUser)    
    .delete(deleteUser)

    export default userRouter