import { User } from '../../models'
import { verifyToken } from '../utils/helpers'
import Responses from '../utils/Responses';

import { PHONE_ALREADY_EXISTS_ERR,
    AUTH_HEADER_MISSING_ERR, 
    AUTH_TOKEN_MISSING_ERR,
    USER_NOT_FOUND_ERR } from '../constants'

export const isUserExist = async (req, res, next) => {
    const {email } = req.body
    const user = await User.findOne({where:{email}})
    
    if (!user) {
        next()
    } else {
        Responses.setError(302, 'Kindly login as this email is registered to an account or use another email to create account')
        Responses.send(res)
    }
}

export const isLoggedIn = async (req, res, next) => {
    try {
        const { authorization } = req.headers
    
        const payload = verifyToken(authorization.split(' ')[1])

        if(payload.email) {
            const userRes = await User.findByPK(payload.id);
            if(payload.email === userRes.email) {
                req.userObj = userRes

                next()
            } else {

            }
        }
    } catch (error) {
        Responses.setError(401, 'Token has expired or invalid')
        Responses.send(res)
    }
}

export const isAuthenticated = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if(!authorization) {
            next({status:403, message:AUTH_HEADER_MISSING_ERR});
            return
        }

        const token = authorization.split(' ')[1]     
        if(!token) {
            next({status:403, message:AUTH_TOKEN_MISSING_ERR})
            return
        }

        const payload = verifyToken(token);
        if(!payload) {
            next({status:403, message:JWT_DECODE_ERR});
            return
        }

        const user = await User.findByPk(payload.id);

        
        if(!user) {
            next({status:404, message:USER_NOT_FOUND_ERR})
            return
        }
        res.locals.user = user;
        next()

    } catch (error) {
        next(error)
    }
}

export const isPhoneNumberAlreadyExist = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}