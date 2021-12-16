const Comment = require('../models/Comments');

const list = (where) => {
    return Comment.find(where || {}); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

const listById = (id) => {
    return Comment.findById(id); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

const insert = (commentDocument) => {
    const comment = new Comment(commentDocument);
    return comment.save();
};

const modify = (data, id) => {
    return Comment.findByIdAndUpdate(id, data, { new: true });
};

const getCommentsForBlog = (blogID) => {
    return Comment.find(blogID);
};

const removeCommentsForBlogId = (blogId) => {
    return Comment.deleteMany(blogId);
};

const remove = (id) => {
    return Comment.findByIdAndDelete(id);
};

const removeCommentsForUser = (userID) => {
    return Comment.deleteMany({ user_id: userID });
};

module.exports = {
    insert,
    list,
    listById,
    modify,
    remove,
    removeCommentsForBlogId,
    removeCommentsForUser,
    getCommentsForBlog,
};
