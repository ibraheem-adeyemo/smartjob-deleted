import { constStrings } from "../constants";
import { createUser, getAuserWithPK, login, udpdateUser } from "../services/user";
import { ErrorResponse } from "../utils/ErrorResponse"
import { composeCourierVerificationMail, composeVerificationMail, courierMailSender, generateToken, hashPassword, sendEmail, transporter, verifyToken } from "../utils/helpers"
import Responses from "../utils/Responses"
import { authSchema, loginSchema } from "../utils/validations/authValidation";


const objectify = (data) => {
    return JSON.parse(JSON.stringify(error))
}
const signupController = async (req, res, next) => {
    let errorCode, errorMessage
    try {
        const { host } = req.headers;
        const {firstName, lastName, email, password, phoneNumber} = req.body
        const userObj = {firstName, lastName, email, password, phoneNumber}

        let { error, value} = authSchema.validate(userObj)
        if(error) next(new ErrorResponse(error.message, 400))


        const hashedPassword = await hashPassword(value.password)

        // // token should ve removed from the database
        value = {...value, token:'token', password:hashedPassword}


        const userResponse = await createUser(value)

        const userData = {
            id:userResponse.id, 
            firstName:userResponse.firstName, 
            lastName:userResponse.lastName, 
            email:userResponse.email, 
            phoneNumber:userResponse.phoneNumber,
            isVerified:userResponse.isVerified
        }
        
            
        const token = generateToken({email:userData.email, id:userData.id})

        const mailContent = composeVerificationMail(userData.email, host, token )
        sendEmail(transporter(), mailContent)
            
        // const courierRes = await courierMailSender({name:'', recipien: userEmail, content: composeCourierVerificationMail(userEmail, host, token)})
            
        const msg = constStrings.msg
        Responses.setSuccess(201,msg, {token, data: userData});
        Responses.send(res)   
    } catch (error) {
        // const {code, errno} = JSON.parse(JSON.stringify(error)).parent
        // errorCode = code
        // Responses.setError(errorCode, errno)
        // Responses.send(res)
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
        console.log(JSON.parse(JSON.stringify(error)))
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

export {
    signupController,
    loginController,
    verifyUserController
}