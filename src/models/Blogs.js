const Mongoose = require('mongoose');

const BlogSchema = new Mongoose.Schema(
    {
        text: String,
        title: String,
        author: String,
        category: String,
        user_id: {
            type: Mongoose.Types.ObjectId,
            ref: 'user',
        },
        numLikes: Number,
        published: Boolean,
        tags: [String],
        likedByUsers: [
            {
                user_id: {
                    type: Mongoose.Types.ObjectId,
                    ref: 'user',
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Blog = Mongoose.model('blog', BlogSchema);

module.exports = Blog;
