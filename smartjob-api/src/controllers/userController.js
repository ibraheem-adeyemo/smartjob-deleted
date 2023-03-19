import { constStrings } from "../constants";
import { createUser, findUserByEmail, getAuserWithPK, login, udpdateUser } from "../services/user";
import { ErrorResponse } from "../utils/ErrorResponse"
import { composeCourierVerificationMail, composeVerificationMail, courierMailSender, generateToken, hashPassword, sendEmail, sendMail, transporter, verifyToken } from "../utils/helpers"
import Responses from "../utils/Responses"
import { authSchema, loginSchema } from "../utils/validations/authValidation";

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
        console.log( JSON.parse(JSON.stringify(error)))

        next({message:constStrings.databaseError, statusCode:500})
    }
}

const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body
       
        const userObj = {email, password}

        let {error, value} = loginSchema.validate(userObj)
        console.log(value)

        if(error) next(new ErrorResponse(error.message, 400))

        
        const userRes = await login(userObj)
        
        console.log(userRes)
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
    let updatedUser;
    try {
        const { token } = req.params;
        const {email, id} = verifyToken(token);
        const user = await getAuserWithPK(id);
        console.log(user.email, user.id, id)
        if(email === user.email) {
            updatedUser = await udpdateUser(email);
        }
        Responses.setSuccess(200, 'Email has been verified');
        return Responses.send(res);
    } catch (error) {
        const err = JSON.parse(JSON.stringify(error))
        next({message:err.name, statusCode:401})
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

const forgetPasswordController = (req, res) => {
    try {
        const { host } = req.headers
        const { email } = req.body

        const userRes = findUserByEmail(email)

        const token = generateToken({email:userRes.email, id:userRes.id})

        const { forgetPassword, resetPasswordLinkSuccess} = constStrings

        sendMail(userRes.email, host, token, forgetPassword)

        Responses.setSuccess(200, resetPasswordLinkSuccess);
        Responses.send(res)
        
    } catch (error) {
        next({message:constStrings.databaseError, statusCode:500})
    }
}

const resetPasswordController = (req, res, next) => {

}

export {
    signupController,
    loginController,
    verifyUserController,
    resendVerificationLinkController,
    forgetPasswordController,
    resetPasswordController
}