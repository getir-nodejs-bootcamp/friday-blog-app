const User = require("../models/Users")

const insert = (data) => {
    const user = new User(data);
    return user.save();
}

const list = () => {
    return User.find({})
}

const loginUser = (loginData) => {
    /*
    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
    */
    return User.findOne(loginData)
}

const modify = (where, updateData) => {

    return User.findOneAndUpdate(where, updateData, {new: true})
}

const remove = (id) => {
    return User.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove
}