import Joi from '@hapi/joi'

export const serviceSchema = Joi.object().keys({
    workId:Joi.number().integer().required(),
    description: Joi.string().min(20).required(),
    expertLevel:Joi.string().required().label('Expertise level can only be one of beginer, intermediate, expert'),
    yearsOfExperience:Joi.number().integer().required(),
    status:Joi.string().required().label('Available or not available'),
    userId:Joi.number().integer().required(),
    banners:Joi.string().required(),
    location:Joi.required().label('It can either be id of existing address or a new address'),
    servicecharge: Joi.required().label('something like [{"amount":1000, "period":"hour"},{"amount":5000, "period":"daily"}]'),
    serviceType:Joi.required().label('["hourly", "daily", "weekly", "biweekly", "monthly"]'),
})