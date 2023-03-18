import express from 'express'
import { signupController, loginController, verifyUserController } from '../controllers/userController';

const userRoute = express.Router()

userRoute.post('/users/createAccount', signupController)
userRoute.post('/users/login', loginController)
userRoute.get('/users/verifyUser/:token', verifyUserController)

export default userRoute;