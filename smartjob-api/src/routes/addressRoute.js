import express from 'express'
import { createAddressController, getNearestAddressController } from '../controllers/addressController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const addressRoute = express.Router()

addressRoute.post('/addresses/create-address', isAuthenticated, createAddressController)
addressRoute.get('/addresses/nearest-services', isAuthenticated, getNearestAddressController)

export default addressRoute;