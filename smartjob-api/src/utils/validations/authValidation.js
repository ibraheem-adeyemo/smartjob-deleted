import Joi from '@hapi/joi'

const name = Joi.string().trim().required().regex(/^[A-Za-z]+$/)
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/).label('password is required, must be at least 8 characters and must contain at least a number, one lowercase and one uppercase alphabet');
const email = Joi.string().trim().lowercase().email().required().label('email is required, and should follow this format: myemail@domain.com');
    

export const authSchema = Joi.object().keys({
    firstName:name.min(2).max(30).label('firstname is required, must be alphabets only and have at least 2 characters'),
    lastName:name.min(2).max(30).label('lastname is required, must be alphabets only and have at least 2 characters'),
    password:password,
    email:email,
    phoneNumber:Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('PhoneNumber is required, and should follow this format: +234 70 0000000')

})

export const loginSchema = Joi.object().keys({
    password:password,
    email:email
})

// const validateName = (ctx, next) => {
//     let errorMessage = ''
//     if(ctx.value.trim().length < 2 ) {errorMessage = `${ctx.field} field should not less than 2 characters`}
//     if('/\d/'.text(ctx.value)) {errorMessage = `${ctx.field} field should not contain a number`}
//     return errorMessage ? next(new ErrorResponse(errorMessage, 400) ) : ''
// }

// const validateEmail = (ctx, next) => {
//     let errorMessage = ''
//     if(ctx.value) {}
// }

// const authValidation = (type, ctx, next) => {
//     switch (type) {
//         case value:
//            return validateName(ctx, next)    
//         default:
//             break;
//     }
// }