const Joi = require("joi");

const createValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string().required(),
    published: Joi.boolean()
});

const updateValidation = Joi.object({
    text: Joi.string().min(5),
    title: Joi.string().min(1),
    category: Joi.string().min(1),
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