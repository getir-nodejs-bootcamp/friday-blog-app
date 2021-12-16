const Joi = require('joi');

const createValidation = Joi.object({
    blog_id: Joi.string().required().min(10),
    text: Joi.string().required().min(1),
});

const updateValidation = Joi.object({
    text: Joi.string().required().min(1),
});

module.exports = {
    createValidation,
    updateValidation,
};
