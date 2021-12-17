const Blog = require('../models/Blogs');

const list = (where) => {
    return Blog.find(where || {}); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

const listById = (id) => {
    return Blog.findById(id); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

const listPopularBlogs = () => {
    const pipeline = [
        {
            $match: {
                published: true,
            },
        },
        {
            $project: {
                _id: 1,
                text: 1,
                title: 1,
                author: 1,
                category: 1,
                numLikes: 1,
            },
        },
        {
            $sort: {
                numLikes: -1,
            },
        },
        {
            $limit: 10,
        },
    ];
    return Blog.aggregate(pipeline);
};

const listPopularBlogsByCategory = (categoryToFilter) => {
    console.log(categoryToFilter);
    const pipeline = [
        {
            $match: {
                published: true,
                category: categoryToFilter,
            },
        },
        {
            $project: {
                _id: 1,
                text: 1,
                title: 1,
                author: 1,
                category: 1,
                numLikes: 1,
            },
        },
        {
            $sort: {
                numLikes: -1,
            },
        },
        {
            $limit: 5,
        },
    ];
    return Blog.aggregate(pipeline);
};

const listRecommendedBlogsForUser = (preferredHashtags) => {
    const query = {
        published: true,
        tags: {
            $all: preferredHashtags,
        },
    };

    const projection = {
        _id: 1,
        text: 1,
        title: 1,
        author: 1,
        category: 1,
        numLikes: 1,
        tags: 1,
    };
    return Blog.find(query, projection);
};

// NOTE: in order to implement this query, you need to create index for field text
// db.blogs.createIndex( { text: "text" } )
const listBlogsByGivenWords = (words) => {
    // words such as "coffee newyork"

    const query = { $text: { $search: `${words}` } };

    const projection = {
        _id: 1,
        text: 1,
        title: 1,
    };

    return Blog.find(query, projection);
};

const listBlogsLikedByCurrentUser = (userID) => {
    const query = { likedByUsers: { $elemMatch: { user_id: userID } } };
    return Blog.find(query);
};

const insert = (blogDocument) => {
    const blog = new Blog(blogDocument);
    return blog.save();
};

const modify = (data, id) => {
    return Blog.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
    return Blog.findByIdAndDelete(id);
};

const removeBlogsForUser = (userID) => {
    return Blog.deleteMany({ user_id: userID });
};

const incrementLike = (id) => {
    return Blog.findByIdAndUpdate(id, { $inc: { numLikes: 1 } }, { new: true });
};

const decrementLike = (id) => {
    return Blog.findByIdAndUpdate(
        id,
        { $inc: { numLikes: -1 } },
        { new: true }
    );
};

module.exports = {
    insert,
    list,
    listById,
    listPopularBlogs,
    listPopularBlogsByCategory,
    listRecommendedBlogsForUser,
    listBlogsByGivenWords,
    listBlogsLikedByCurrentUser,
    modify,
    remove,
    removeBlogsForUser,
    incrementLike,
    decrementLike,
};
