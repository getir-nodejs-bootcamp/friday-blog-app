const { insert, modify, list, listById, remove } = require("../services/Blogs");
const { getCommentsForBlog, removeCommentsForBlogId } = require("../services/Comments");
const httpStatus = require("http-status");

const index = (req, res) => {
    // console.log(req.user)
    list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message}))
}

const getBlog = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Blog ID is missing."
        })
    }
    listById(req.params?.id).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send( {error: e.message}))
}


const createBlog = (req, res) => {
    // req.body.user_id = req.user;
    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch(e => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message});
    })
};

const updateBlog = (req, res) => {
    console.log(req.params.id)
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Blog ID is missing."
        })
    }
    modify(req.body, req.params?.id).then(updatedBlog => {
        res.status(httpStatus.OK).send(updatedBlog)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(
        {error: e.message}
    ))
}

const deleteBlog = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Blog ID is missing."
        })
    }

    //  remove comments for blog
    // TODOS: write leaner implementation
    getCommentsForBlog(req.params).then( (existingComments) => {
        if (existingComments) {
            removeCommentsForBlogId(req.params).then( (removedComments) => {
                console.log(`${removedComments.deletedCount} comments are removed`)
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send( {error: e.message})) 
        }
        console.log(`Comments for blog id: ${req.params.id} are safely removod.`)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send( {error: e.message})) 
  
    // remove blog
    remove(req.params?.id).then( (deletedBlog) => {
        console.log("deleted blog >> ", deletedBlog);
        if(!deletedBlog){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Blog cannot be found."
            })
        }
        res.status(httpStatus.OK).send({
            message: "Blog is removed."
        });
    })
    .catch( e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )
    
}

module.exports = {
    index,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}