import { User } from '../../models'
import { ErrorResponse } from '../utils/ErrorResponse'

export const createUser = async (userObj) => {
    return  User.create(userObj)
    // try {    
    // const response = await User.create(userObj)
    
    // const userResponse = {
    //     id:response.id,
    //     firstName: response.firstName,
    //     lastName: response.lastName,
    //     userEmail:response.email
    // }
    // return {status: 'Success', userResponse}
      
    // } catch (error) {
    //     const dbError = JSON.parse(JSON.stringify(error))
    //     console.log( dbError.parent.errno, 'reaching =====3')
    //     Responses.setError(dbError.parent.errno, dbError);
    //     Responses.send(res)
    //     // return new ErrorResponse('error.errors[0]', 500)
    // }
}

export const getAuserWithValue = async (key, val) => {
    try {
        const res = await User.find()
    } catch (error) {
        
    }
}

export const getAuserWithPK = async (id) => {
    try {
        const res = await User.findByPk(id)
        return res
    } catch (error) {
        return new ErrorResponse(error.message, 500)
    }
}

export const udpdateUser = async (email) => {
    return User.update(
        {isVerified: true},
        {where: {email}}
    )
}
