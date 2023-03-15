import Responses from "../utils/Responses"
import { createAServiceService } from "../services/serviceServices";

const createServiceController = (req, res) => {
    const reqBody = req.body
    // const reqImg = req
    console.log(reqBody, req.file)
    // createAServiceService(reqBody);
    Responses.setSuccess(200, 'you just created a Service');
    Responses.send(res)
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
export {
    createServiceController,
    getAllServicesController,
    editServiceController,
    deleteServiceController
}