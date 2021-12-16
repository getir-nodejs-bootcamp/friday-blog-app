const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    full_name: String,
    password: String,
    email: String,
    profile_image: String,
    preferences: {
        sendMail: {
            type: Boolean,
            default: true
        },
        sendSMS: {
            type: Boolean,
            default: true
        }
    },
}, {timestamps: true, versionKey: false})

module.exports = Mongoose.model("user", UserSchema);

