const Blog = require("../models/Blogs")

const list = (where) => {
    return Blog.find(where || {})/*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
}

const listById = (id) => {
    return Blog.findById(id)/*.populate({
        path: "user_id",
        select: "full_name email profile_image",
    })*/
}

const insert = (blogDocument) => {
    const blog = new Blog(blogDocument);
    return blog.save();
}

const modify = (data, id) => {
    return Blog.findByIdAndUpdate(id, data, {new: true});
}

const remove = (id) => {
    console.log("hit")
    return Blog.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    listById,
    modify,
    remove
}