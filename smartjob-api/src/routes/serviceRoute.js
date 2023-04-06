import express from 'express'
import { 
    createServiceController,
    getAllServicesController,
    editServiceController,
    deleteServiceController,
    nearRestServiceController
} from '../controllers/serviceController';
import { uploads } from '../utils/helpers'
import { isAuthenticated } from '../middlewares/authMiddleware'

const serviceRoute = express.Router()

serviceRoute.post('/services/createAService', isAuthenticated, uploads.single('banners'), createServiceController)
serviceRoute.get('/services/allJServices', getAllServicesController)
serviceRoute.get('/services/aService/:id', createServiceController)
serviceRoute.put('/services/editAService', editServiceController)
serviceRoute.delete('/services/deleteAService/:id', deleteServiceController)
serviceRoute.get('/services/nearest-services', nearRestServiceController )


export default serviceRoute;