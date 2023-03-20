import { User } from '../../models'
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