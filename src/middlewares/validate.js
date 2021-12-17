const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        // error.details = [{message: ""}, {message: ""}]
        const errorMessage = error.details
            ?.map((detail) => detail.message)
            .join(', ');
        // ["","",""] => "aaa"
        res.status(httpStatus.BAD_REQUEST).json({ error: errorMessage });
        return;
    }

    Object.assign(req, value);
    return next();
};

module.exports = validate;
