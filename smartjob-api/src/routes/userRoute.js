import express from 'express'
import { signupController, 
        loginController, 
        verifyUserController, 
        resendVerificationLinkController,
        forgetPasswordController,
        resetPasswordController
     } from '../controllers/userController';
import { isUserExist } from '../middlewares/authMiddleware';

const userRoute = express.Router()

userRoute.post('/users/createAccount', isUserExist, signupController)
userRoute.post('/users/login', loginController)
userRoute.post('/users/forgetPassword', forgetPasswordController)
userRoute.post('/users/resetPassword/:id/:token', resetPasswordController)
userRoute.get('/users/resendEmailVerificationLink', resendVerificationLinkController)
userRoute.get('/users/verifyUser', verifyUserController)

export default userRoute;