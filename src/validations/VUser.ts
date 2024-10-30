import Joi from "joi"

const CreateUser = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,12}$"))
    .required()
    .messages({
        'string.pattern.base': 'Password invalid',
    }),
    repeat_password: Joi.ref('password'),
    phone: Joi.string().required(),
    adress: Joi.string().required(),
}).with('password', 'repeat_password')

export {
    CreateUser
}