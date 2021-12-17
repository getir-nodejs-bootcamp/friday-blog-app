const Joi = require('joi');

const createValidation = Joi.object({
    full_name: Joi.string().required().min(3),
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
    //preferences are default true and created at model level
});

const loginValidation = Joi.object({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required().min(8),
});

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(8),
});

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(8),
});

const updateValidation = Joi.object({
    full_name: Joi.string().min(3),
    email: Joi.string().email().min(8),
    /**
     *  the first letter for country code should start with 1 to 9
     *  following this there might be additional numbers from 0 to 9 for up to 2 letters, optional
     *  e.g the U.S case: number starts with 1 and goes with 10 digits
     *  e.g the Turkey case: number starts with 90 and goes with 10 digits
     */ 
    phoneNumber: Joi.string().regex(/^[1-9]{1}(d{2})?\d{10}/).min(11).max(13),
    preferences: Joi.object().keys({
        sendMail: Joi.boolean(),
        sendSMS: Joi.boolean(),
    }),
    preferredHashtags: Joi.array(),
});

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    changePasswordValidation,
    updateValidation,
};
