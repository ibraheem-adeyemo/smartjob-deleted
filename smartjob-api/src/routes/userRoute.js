import express from 'express'
import { signupController, 
        loginController, 
        verifyUserController, 
        resendVerificationLinkController,
        forgetPasswordController,
        resetPasswordController,
        verifyOTPController,
<<<<<<< HEAD
        registerPhoneNumberController,
        verifyPhoneController
     } from '../controllers/userController';
import { isUserExist, isAuthenticated, isPhoneNumberAlreadyExist } from '../middlewares/authMiddleware';
=======
        registerPhoneNumberController
     } from '../controllers/userController';
import { isUserExist, isAuthenticated } from '../middlewares/authMiddleware';
>>>>>>> 3a56928751488b47c5362719c11214b7498a4b91

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