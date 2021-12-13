const { insert, modify, list, listById, remove } = require("../services/Comments");
const httpStatus = require("http-status");

const index = (req, res) => {
    // console.log(req.user)
    list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message}))
}

const getComment = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Comment ID is missing."
        })
    }
    listById(req.params?.id).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send( {error: e.message}))
}


const createComment = (req, res) => {
    // req.body.user_id = req.user;
    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch(e => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message});
    })
};

const updateComment = (req, res) => {
    console.log(req.params.id)
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Comment ID is missing."
        })
    }
    modify(req.body, req.params?.id).then(updatedComment => {
        res.status(httpStatus.OK).send(updatedComment)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(
        {error: e.message}
    ))
}

const deleteComment = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Comment ID is missing."
        })
    }
    
    remove(req.params?.id).then( (deletedComment) => {
        console.log("deleted Comment >> ", deletedComment);
        if(!deletedComment){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Comment cannot be found."
            })
        }
        res.status(httpStatus.OK).send({
            message: "Comment is removed."
        });
    })
    .catch( e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )
}
/*
const deleteCommentForBlog = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Blog ID is missing."
        })
    }

    removeByBlogId(req.params?.id).then( (deletedComments) => {
        console.log("deleted Comments >> ", deletedComments);
        if(!deletedComments){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Comments cannot be found."
            })
        }
        res.status(httpStatus.OK).send({
            message: "Comments are removed."
        });
    })
    .catch( e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )
*/



module.exports = {
    index,
    getComment,
    createComment,
    updateComment,
    deleteComment,
    // deleteCommentForBlog
}