import Responses from '../utils/Responses'
import {constStrings} from '../constants';
import { address } from '../../models'
import { ADDRESS_CREATED_SUCCESSFULLY } from '../constants'

export const createAddressController = async (req, res, next) => {
    try {
        const { user } = res.locals
        const { country, state, city, municipality, long, lat } = req.body
        const addressObj = {
            country,
            state,
            city,
            municipality,
            location: {type:'Point', coordinates:[long,lat]},
            longitude:long,
            latitude:lat,
            userId:user.id,
            coordinate:`${long} ${lat}`
        }

        const addressRes = await address.create(addressObj)

        Responses.setSuccess(201, ADDRESS_CREATED_SUCCESSFULLY, {data:addressRes})
        Responses.send(res)
    } catch (error) {
        console.log(error)
        next({message:constStrings.databaseError, statusCode:500})  
    }
}

export const getNearestAddressController = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}