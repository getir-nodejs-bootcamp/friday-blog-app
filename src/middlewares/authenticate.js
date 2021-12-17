const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1] || null;
    if (token === null) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ error: 'you need to login first' });
    }

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.status(httpStatus.FORBIDDEN).send({ error: err });
        req.userInfo = user?._doc;
        next();
    });
};

module.exports = authenticateToken;
