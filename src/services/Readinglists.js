const Readinglist = require("../models/Readinglists")

const list = (where) => {
    return Readinglist.find(where || {})/*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
}

const listById = (id) => {
    return Readinglist.findById(id)/*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
}

const insert = (doc) => {
    const blog = new Readinglist(doc);
    return blog.save();
}

const modify = (data, id) => {
    return Readinglist.findByIdAndUpdate(id, data, {new: true});
}

const remove = (id) => {
    return Readinglist.findByIdAndDelete(id);
}

const addBlog = (id) => {
    return Readinglist.findByIdAndDelete(id);
}

const removeBlog = (id) => {
    return Readinglist.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    listById,
    modify,
    remove,
}