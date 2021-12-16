const Joi = require("joi");

const createValidation = Joi.object({
    full_name: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
    //preferences are default true and created at model level
});

const loginValidation = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8)
});

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8)
});

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(8)
});

const updateValidation = Joi.object({
    preferences: Joi.object().keys({
        sendMail: Joi.boolean(),
        sendSMS: Joi.boolean()
    })
});

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    changePasswordValidation,
    updateValidation
}
