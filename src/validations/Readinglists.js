const Joi = require('joi');

const createValidation = Joi.object({
    name: Joi.string().required().min(3),
});

const updateValidation = Joi.object({
    name: Joi.string().min(3),
    blogs: Joi.array().items(Joi.object()),
});

module.exports = {
    createValidation,
    updateValidation,
};
