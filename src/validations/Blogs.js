const Joi = require('joi');

const createValidation = Joi.object({
    text: Joi.string().required().min(5),
    title: Joi.string().required(),
    category: Joi.string().required(),
    published: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
});

const updateValidation = Joi.object({
    text: Joi.string().min(5),
    title: Joi.string().min(1),
    category: Joi.string().min(1),
    published: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
});

const sendLikeFlagValidation = Joi.object({
    liked: Joi.boolean(),
});

const searchBlogsByKeywordsValidation = Joi.object({
    keywords: Joi.string().min(1),
});

module.exports = {
    createValidation,
    updateValidation,
    sendLikeFlagValidation,
    searchBlogsByKeywordsValidation,
};
