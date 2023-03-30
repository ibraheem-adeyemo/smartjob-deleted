import { User } from '../../models'
import { verifyToken } from '../utils/helpers'
import Responses from '../utils/Responses'

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