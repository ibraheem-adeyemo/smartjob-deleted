import express from 'express'
import { signupController, 
        loginController, 
        verifyUserController, 
        resendVerificationLinkController,
        forgetPasswordController,
        resetPasswordController,
        verifyOTPController,
        registerPhoneNumberController,
        verifyPhoneController
     } from '../controllers/userController';
import { isUserExist, isAuthenticated, isPhoneNumberAlreadyExist } from '../middlewares/authMiddleware';

const userRoute = express.Router()

userRoute.post('/users/createAccount', isUserExist, signupController)
userRoute.post('/users/login', loginController)
userRoute.post('/users/forgetPassword', forgetPasswordController)
userRoute.post('/users/resetPassword/:id/:token', resetPasswordController)
userRoute.get('/users/resendEmailVerificationLink', resendVerificationLinkController)
userRoute.get('/users/verifyUser', verifyUserController)
userRoute.post('/users/verifyEmailOtp', isAuthenticated, verifyOTPController)
userRoute.post('/users/registerPhoneNumber', isAuthenticated, isPhoneNumberAlreadyExist, registerPhoneNumberController)
userRoute.post('/users/verifyPhone', isAuthenticated, verifyPhoneController)

export default userRoute;