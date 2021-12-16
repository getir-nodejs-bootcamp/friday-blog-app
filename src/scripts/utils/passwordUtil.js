const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const passwordToHash = (password) => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
    passwordToHash,
    comparePassword,
};
