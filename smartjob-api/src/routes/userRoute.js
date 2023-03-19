import express from 'express'
import { signupController, 
        loginController, 
        verifyUserController, 
        resendVerificationLinkController,
        forgetPasswordController,
        resetPasswordController
     } from '../controllers/userController';

const userRoute = express.Router()

userRoute.post('/users/createAccount', signupController)
userRoute.post('/users/login', loginController)
userRoute.post('/users/forgetPassword', forgetPasswordController)
userRoute.post('/users/resetPassword', resetPasswordController)
userRoute.get('/users/resendEmailVerificationLink', resendVerificationLinkController)
userRoute.get('/users/verifyUser/:token', verifyUserController)

export default userRoute;