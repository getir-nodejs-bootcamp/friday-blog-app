const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
    console.log('connected to MongoDB');
});

const connectDB = async () => {
    await Mongoose.connect(`${process.env.MONGODB_ATLAS}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = {
    connectDB,
};
