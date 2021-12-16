const { insert, modify, list, listById, remove } = require("../services/Readinglists");
const httpStatus = require("http-status");

const index = (req, res) => {
    // console.log(req.user)
    list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message}))
}

const getReadinglist = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Readinglist ID is missing."
        })
    }
    listById(req.params?.id).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send( {error: e.message}))
}


const createReadinglist = (req, res) => {

    // get user info from auth middleware
    const { _id } = req.userInfo;

    // add user_id to request body JSON
    req.body.user_id = _id;
    
    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch(e => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message});
    })
};

const updateReadinglist = (req, res) => {
    console.log(req.params.id)
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Readinglist ID is missing."
        })
    }
    modify(req.body, req.params?.id).then(updatedReadinglist => {
        res.status(httpStatus.OK).send(updatedReadinglist)
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(
        {error: e.message}
    ))
}

const deleteReadinglist = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "Readinglist ID is missing."
        })
    }
    
    remove(req.params?.id).then( (deletedReadinglist) => {
        if(!deletedReadinglist){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "Readinglist cannot be found."
            })
        }
        res.status(httpStatus.OK).send({
            message: "Readinglist is removed."
        });
    })
    .catch( e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )
}


module.exports = {
    index,
    getReadinglist,
    createReadinglist,
    updateReadinglist,
    deleteReadinglist,
}