const {
    insert,
    modify,
    list,
    listById,
    remove,
} = require('../services/Readinglists');
const { listById: getBlogById } = require('../services/Blogs');
const httpStatus = require('http-status');

const index = (req, res) => {
    // console.log(req.user)
    list()
        .then((response) => {
            res.status(httpStatus.OK).send(response);
        })
        .catch((e) =>
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: e.message })
        );
};

const getReadinglist = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Readinglist ID is missing.',
        });
    }
    listById(req.params?.id)
        .then((response) => {
            res.status(httpStatus.OK).send(response);
        })
        .catch((e) =>
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: e.message })
        );
};

const createReadinglist = (req, res) => {
    // get user info from auth middleware
    const { _id } = req.userInfo;

    // add user_id to request body JSON
    req.body.user_id = _id;

    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: e.message,
            });
        });
};

const updateReadinglist = (req, res) => {
    console.log(req.params.id);
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Readinglist ID is missing.',
        });
    }
    modify(req.body, req.params?.id)
        .then((updatedReadinglist) => {
            res.status(httpStatus.OK).send(updatedReadinglist);
        })
        .catch((e) =>
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: e.message })
        );
};

const deleteReadinglist = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Readinglist ID is missing.',
        });
    }

    remove(req.params?.id)
        .then((deletedReadinglist) => {
            if (!deletedReadinglist) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: 'Readinglist cannot be found.',
                });
            }
            res.status(httpStatus.OK).send({
                message: 'Readinglist is removed.',
            });
        })
        .catch((e) =>
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: e.message,
            })
        );
};

const addBlogToReadinglist = (req, res) => {
    // check if reading exists at parameters
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Reading List ID is missing.',
        });
    }
    // check if blog exists at parameters
    if (!req.params?.blogId) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Blog ID is missing.',
        });
    }

    // find reading list
    // check if current user added blog to this reading list before
    // if not; check for whether blog exists in the db or not
    // push blog to blogs array in readinglist model
    // send to db

    listById(req.params?.id).then((readinglist) => {
        if (!readinglist)
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Reading list not found' });

        const foundBlog = readinglist.blogs.find(
            (elem) => elem.blog_id.toString() === req.params.blogId
        );

        if (foundBlog)
            return res
                .status(httpStatus.OK)
                .send({
                    message:
                        'Current user has already added this blog to playlist',
                });

        // check if blog exists in the database
        getBlogById(req.params.blogId)
            .then((blog) => {
                if (!blog)
                    return res
                        .status(httpStatus.NOT_FOUND)
                        .send({ message: 'Blog does not exists' });

                // then it is safe to add blog to reading list
                // create object to add array
                const blogToBeAdded = {
                    blog_id: req.params?.blogId,
                };

                readinglist.blogs.push(blogToBeAdded);

                readinglist
                    .save()
                    .then((updatedDoc) => {
                        res.status(httpStatus.OK).send(updatedDoc);
                    })
                    .catch((e) => {
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(
                            e.message
                        );
                    });
            })
            .catch((e) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
            });
    });
};

const removeBlogFromReadingList = (req, res) => {
    // check if reading exists at parameters
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Reading List ID is missing.',
        });
    }
    // check if blog exists at parameters
    if (!req.params?.blogId) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Blog ID is missing.',
        });
    }

    // find reading list
    // check if current user added blog to this reading list before
    // if not; send reading list not found
    // if exists; filter array therefore; blog is no longer being held in the array
    // save array, send to db

    listById(req.params?.id)
        .then((readinglist) => {
            if (!readinglist)
                return res
                    .status(httpStatus.NOT_FOUND)
                    .send({ message: 'Reading list not found' });

            const foundBlog = readinglist.blogs.find(
                (elem) => elem.blog_id.toString() === req.params.blogId
            );
            if (!foundBlog)
                return res
                    .status(httpStatus.OK)
                    .send({
                        message:
                            'Current user did not add this blog to playlist before',
                    });

            // create object to add array
            readinglist.blogs = readinglist.blogs.filter(
                (elem) => elem.blog_id.toString() !== req.params.blogId
            );

            readinglist
                .save()
                .then((updatedDoc) => {
                    res.status(httpStatus.OK).send(updatedDoc);
                })
                .catch((e) => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
                });
        })
        .catch((e) =>
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: e.message })
        );
};

module.exports = {
    index,
    getReadinglist,
    createReadinglist,
    updateReadinglist,
    deleteReadinglist,
    addBlogToReadinglist,
    removeBlogFromReadingList,
};
