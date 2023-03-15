import express from 'express'
import { signupController, loginController } from '../controllers/userController';

const userRoute = express.Router()

userRoute.post('users/signup', signupController)
userRoute.post('users/login', loginController)

export default userRoute;