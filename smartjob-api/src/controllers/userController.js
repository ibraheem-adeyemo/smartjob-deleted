import { constStrings } from "../constants";
import { createUser, findUserByEmail, getAuserWithPK, login, udpdateUser } from "../services/user";
import { ErrorResponse } from "../utils/ErrorResponse"
import { composeCourierVerificationMail, composeVerificationMail, courierMailSender, generateToken, hashPassword, sendEmail, sendMail, transporter, verifyToken } from "../utils/helpers"
import Responses from "../utils/Responses"
import { authSchema, loginSchema } from "../utils/validations/authValidation";
import {UserActivation } from '../../models'
import { generateRandomString } from "../utils/function";

const secret = process.env.SECRET
console.log(secret)
// import { }

const signupController = async (req, res, next) => {
    try {
        const { host } = req.headers;
        const {firstName, lastName, email, password, phoneNumber} = req.body
        const userObj = {firstName, lastName, email, password, phoneNumber}

        let { error, value} = authSchema.validate(userObj)
        if(error) next(new ErrorResponse(error.message, 400))


        const hashedPassword = await hashPassword(value.password)

        // // token should ve removed from the database
        value = {...value, password:hashedPassword}


        const userResponse = await createUser(value)

       const hashedSecret = userResponse.userActivationRes.hashedSecret
       const userEmail = userResponse.userData.email
       const userId = userResponse.userData.id
       const userFullName = userResponse.userData.fullName

        const {msg, verifyUser} = constStrings
        
        
        const jwtToken = generateToken({email:userEmail, id:userId})
        
        const emailData = {
            recipientEmail:userEmail,
            hashedSecret,
            userId,
            host,
            userFullName
        }
        
        sendMail(emailData, verifyUser)
            
        // const courierRes = await courierMailSender({name:'', recipien: userEmail, content: composeCourierVerificationMail(userEmail, host, token)})
            
        Responses.setSuccess(201,msg, {jwtToken, data: userResponse});
        Responses.send(res)   
    } catch (error) {
        // const {code, errno} = JSON.parse(JSON.stringify(error)).parent
        // errorCode = code
        // Responses.setError(errorCode, errno)
        // Responses.send(res)
        console.log(error.type, error.message)

        next({message:constStrings.databaseError, statusCode:500})
    }
}

const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body
       
        const userObj = {email, password}

        let {error, value} = loginSchema.validate(userObj)

        if(error) next(new ErrorResponse(error.message, 400))

        
        const userRes = await login(userObj)
        
        const token = generateToken({id: userRes.id, email:userRes.email})
        const data = {
            id:userRes.id, 
            firstName:userRes.firstName, 
            lastName:userRes.lastName, 
            email:userRes.email, 
            phoneNumber:userRes.phoneNumber,
            isVerified:userRes.isVerified
        }

        const msg = constStrings.msg
        Responses.setSuccess(200, msg, {token, data});
        Responses.send(res)
    } catch (error) {
        console.log(JSON.parse(JSON.stringify(error)), 3)
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const verifyUserController = async (req, res, next) => {
    try {
        const {hashedSecret, email, id } = req.query

        const user = await getAuserWithPK(id);
        
        if(!user) {
            next({message:'User could not be found', statusCode:404})
        }
        const userActivationData = await UserActivation.findOne({where:{userId:user.id}})
        if(!userActivationData) {
            // Responses.setError(404, 'Account has been verified');
            // Responses.send(res)
            next({message:'Account has been verified', statusCode:401})
        }
        if(userActivationData?.hashedSecret === hashedSecret && email === user.email) {
            const updatedUser = await udpdateUser(email);
            UserActivation.destroy({where: {userId:id}})
            Responses.setSuccess(200, 'Email has been verified successfully');
            Responses.send(res);
        } else {
        next({message:'Unauthorized', statusCode:401})
        }
        
    } catch (error) {
        
        next({message:error.message, statusCode:401})
    }
}

const resendVerificationLinkController = async (req, res, next) => {
    try {
        let token
        const { host } = req.headers

        token = { targertMail } = req.params

        const userRes = findUserByEmail(targertMail)

        const {msg, verifyUser} = constStrings
        token = generateToken({email:userRes.email, id:userRes.id})

        sendMail(userRes.email, host, token, verifyUser)
        
        Responses.setSuccess(201,msg, {token});
        Responses.send(res)
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }  

}

const forgetPasswordController = async (req, res) => {
    try {
        const { host } = req.headers
        const { email } = req.body

        const userRes = await findUserByEmail(email)

        if(!userRes) {
            next({message:'User could not be found', statusCode:404})
        }
        const secret = process.env.SECRET + userRes.password
        
        const token = generateToken({email:userRes.email, id:userRes.id}, secret);
        const randomString = generateRandomString(60);

        const emailData = {
            recipientEmail:userRes.email,
            hashedSecret:token,
            userId:'',
            host,
            userFullName:'User'
        }

        const { forgetPassword, resetPasswordLinkSuccess} = constStrings

        sendMail(emailData, forgetPassword)

        Responses.setSuccess(200, resetPasswordLinkSuccess);
        Responses.send(res)
        
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const resetPasswordController = async (req, res, next) => {
    try {
        const {id, token} = req.params
        const userRes = await getAuserWithPK(id)
        if(!userRes) {
            next({message:'User could not be found', statusCode:404})
        }
        const secret = process.env.SECRET + userRes.password
        const payload = verifyToken(token, secret);
        if(id !== payload.id) {
            next({message:'Unauthorized', statusCode:401})
        }
        const newToken = generateToken({email:payload.email, id:userRes.id}, secret);
        Responses.setSuccess(200, {token:newToken, message: 'You can now redirect to reset password page'})
        Responses.send(res)
    } catch (error) {
        next({message:'There is error in redirect user to reset password page', statusCode:500})
    }
}

export {
    signupController,
    loginController,
    verifyUserController,
    resendVerificationLinkController,
    forgetPasswordController,
    resetPasswordController
}