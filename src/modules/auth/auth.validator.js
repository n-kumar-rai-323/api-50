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
    phone:Joi.string().min(10).max(10),
    role:Joi.string().allow(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER).default(UserRole.CUSTOMER)
})

module.exports={
    UserRegisterDTO
}