const Readinglist = require('../models/Readinglists');

const list = (where) => {
    return Readinglist.find(where || {}); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

const listById = (id) => {
    return Readinglist.findById(id); /*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
};

// fetches reading list where specified blog ID exists
const listReadingListsByBlogId = (blogID) => {
    const query = { blogs: { $elemMatch: { blog_id: blogID } } };
    return Readinglist.find(query);
};

const insert = (doc) => {
    const blog = new Readinglist(doc);
    return blog.save();
};

const modify = (data, id) => {
    return Readinglist.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
    return Readinglist.findByIdAndDelete(id);
};

const removeReadingListsForUser = (userId) => {
    return Readinglist.deleteMany({ user_id: userId });
};

module.exports = {
    insert,
    list,
    listById,
    listReadingListsByBlogId,
    modify,
    remove,
    removeReadingListsForUser,
};
