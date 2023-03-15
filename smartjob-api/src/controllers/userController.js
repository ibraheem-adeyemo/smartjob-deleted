import Responses from "../utils/Responses"

const signupController = (req, res) => {
    Responses.setSuccess(200, 'you are signed up');
    Responses.send(res)
}

const loginController = (req, res) => {
    Responses.setSuccess(200, 'you are logged in');
    Responses.send(res)
}

export {
    signupController,
    loginController
}