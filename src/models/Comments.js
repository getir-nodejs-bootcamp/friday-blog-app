const Mongoose = require('mongoose');

const CommentSchema = new Mongoose.Schema(
    {
        blog_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'blog',
        },
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

const Comment = Mongoose.model('comment', CommentSchema);

module.exports = Comment;
