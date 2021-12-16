const Mongoose = require('mongoose');

const ReadinglistSchema = new Mongoose.Schema(
    {
        name: String,
        blogs: [
            {
                blog_id: {
                    type: Mongoose.Types.ObjectId,
                    ref: 'blog',
                },
            },
        ],
        user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user',
        },
        text: String,
        author: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Readinglist = Mongoose.model('readinglist', ReadinglistSchema);

module.exports = Readinglist;
