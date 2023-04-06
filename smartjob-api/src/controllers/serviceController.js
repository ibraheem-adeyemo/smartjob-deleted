import Responses from "../utils/Responses"
import { createAServiceService } from "../services/serviceServices";
import { Service, Address, Charges, ServiceType } from '../../models'
import { serviceSchema } from "../utils/validations/serviceValidation";

import { SERVICE_EXIST_ALREADY, ADDRESS_ALREADY_CREATED, constStrings } from '../constants'

const createServiceController = async (req, res, next) => {
    try {
        const {user} = res.locals
        const {workId, description,location,expertLevel,yearsOfExperience,video,serviceType,status,servicecharge,} = req.body
        const banners = req?.file?.originalname;

        const locationObj = JSON.parse(location)

        const {long, lat} = locationObj

        const service = {workId, description,location,expertLevel,yearsOfExperience,serviceType,status,servicecharge,banners, userId:user.id}

        let { error, value} = serviceSchema.validate(service)

        if(error) {
           return next({status:403, message: error.message})
        }

        let userHaveTheAddress

        if(typeof location !== 'number') {
            userHaveTheAddress = await Address.findAll({
                where: {
                    // city:locationObj.city,
                    // municipality:locationObj.municipality,
                    userId:user.id    
                }
            })
        }      
                
        const serviceChargeObj = JSON.parse(servicecharge);
        const serviceTypeObj = JSON.parse(serviceType)
        
        const serviceObj = {
            workId,
            description,
            expertLevel,
            yearsOfExperience,
            status,
            video,
            userId:user.id,
            banners,
            location: typeof location == 'number' ? location : userHaveTheAddress ? userHaveTheAddress[0].id:null
        }

        console.log(serviceObj)

        const userHasCreatedTheService = await Service.findOne({
            where: {
                userId:user.id,
                workId
            }
        })

        if(userHasCreatedTheService) {
            next({status:403, message:SERVICE_EXIST_ALREADY});
            return
        }

        const newService = await Service.create(serviceObj) 
        let newAddress
        if(typeof location !== 'number' && userHaveTheAddress.length < 1) {
            newAddress = await Address.create({...locationObj, location: {type:'Point', coordinates:[long,lat]}, userId:user.id, serviceId:newService.id})
            Service.update({addressId:newAddress.id}, {
                where: {id:newService.id}
            })
        }

        await Charges.bulkCreate([...serviceChargeObj.map(charg => {
            return {
                ...charg, userId:user.id, serviceId:newService.id
            }
        })])

        await ServiceType.bulkCreate([...serviceTypeObj.map(type => {
            return {
                typeOfService:type, serviceId:newService.id
            }
        })])
        
        const serviceResponse = await Service.findByPk(newService.id
            , {
            include: [
                {model: Address},
                {model: Charges},
                {model: ServiceType},
            ]
        }
        )
        Responses.setSuccess(200, 'you just created a Service', serviceResponse);
        Responses.send(res)
    } catch (error) {
        console.log(error)
        next({message:constStrings.databaseError, statusCode:500}) 
    }
}

const getAllServicesController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to get all Services')
    Responses.send(res)
}

const editServiceController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to edit a single Service')
    Responses.send(res)
}
const deleteServiceController = (req, res) => {
    Responses.setSuccess(200, 'endpoint to delete a single Service')
    Responses.send(res)
}

const nearRestServiceController = async (req, res, nect) => {
    try {
        const { long, lat} = req.query
        
        
    } catch (error) {
        
    }
}
export {
    createServiceController,
    getAllServicesController,
    editServiceController,
    deleteServiceController,
    nearRestServiceController
}