const Joi = require("joi")
const { UserRole } = require("../../config/constants")


const UserRegisterDTO = Joi.object({
    name :Joi.string().min(2).max(50).required().messages({
        'string.empty':'Name cannot be empty',
    }),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    confirmPassword:Joi.string().allow(Joi.ref('password')).required(),
    countryCode:Joi.string(),
    role:Joi.string().allow(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER).default(UserRole.CUSTOMER),
    phone:Joi.object({
        countryCode:Joi.string(),
        phone:Joi.string().min(10).max(10)
    }).allow(null,"").default(null),
    gender:Joi.string().regex(/^(male|female|other)$/).optional(),
    address:Joi.object({
        billing:Joi.string().optional(),
        shipping:Joi.string().optional()
    }).allow(null,"").default(null)
    
})

module.exports={
    UserRegisterDTO
}