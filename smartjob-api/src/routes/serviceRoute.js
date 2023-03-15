import express from 'express'
import { 
    createServiceController,
    getAllServicesController,
    editServiceController,
    deleteServiceController
} from '../controllers/serviceController';
import { uploads } from '../utils/helpers'

const serviceRoute = express.Router()

serviceRoute.post('/createAService',uploads.single('banners'), createServiceController)
serviceRoute.get('/allJServices', getAllServicesController)
serviceRoute.get('/aService/:id', createServiceController)
serviceRoute.put('/editAService', editServiceController)
serviceRoute.delete('/deleteAService/:id', deleteServiceController)


export default serviceRoute;