const Joi = require("joi");

const createValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string().required()
});

const updateValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string().required
});

module.exports = {
    createValidation,
    updateValidation
}