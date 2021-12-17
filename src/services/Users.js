const User = require('../models/Users');

const insert = (data) => {
    const user = new User(data);
    return user.save();
};

const list = (where) => {
    return User.find(where || {});
};

const loginUser = (loginData) => {
    return User.findOne(loginData);
};

const modify = (where, updateData) => {
    return User.findOneAndUpdate(where, updateData, { new: true });
};

const remove = (id) => {
    return User.findByIdAndDelete(id);
};

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove,
};
