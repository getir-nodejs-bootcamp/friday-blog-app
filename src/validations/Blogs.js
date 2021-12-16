const Joi = require("joi");

const createValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string().required(),
    published: Joi.boolean()
});

const updateValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string(),
    published: Joi.boolean()
});

const sendLikeFlagValidation = Joi.object({
    liked: Joi.boolean()
});

module.exports = {
    createValidation,
    updateValidation,
    sendLikeFlagValidation
}