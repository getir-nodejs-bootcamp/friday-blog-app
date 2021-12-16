const httpStatus = require("http-status");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const { insert, list, loginUser, modify, remove } = require("../services/Users");
const { removeBlogsForUser, listBlogsLikedByCurrentUser } = require("../services/Blogs");
const { removeCommentsForUser } = require("../services/Comments");
const { removeReadingListsForUser } = require("../services/Readinglists");
const { passwordToHash, comparePassword } = require("../scripts/utils/passwordUtil");
const { generateAccessToken } = require("../scripts/utils/tokenUtil");

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);

    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        // checks for duplicate key errors for email too
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message});
    })
    
};

const update = (req, res) => {

     // get user info from auth middleware
    modify({_id: req.userInfo?._id}, req.body).then(updatedUser => {
        res.status(httpStatus.OK).send(updatedUser);
    }).catch((e) => res.status().send({error: e.message}))

    // TODOS: user full_name degistirince bloglardaki ve commentlerdeki ismi de değişmeli

}

const login = (req, res) => {

    const { email } = req.body
    loginUser({email: email})
    .then( user => {

        if (!user) 
        return res.status(httpStatus.NOT_FOUND).send({message: "User not found"});

        const passwordMatch = comparePassword(req.body.password, user.password);

        if (!passwordMatch) 
            return res.status(httpStatus.NOT_FOUND).send({message: "Password does not match"});
        
        user = {
            ...user.toObject(),
            tokens : {
                access_token: generateAccessToken(user),
            }
        }
        delete user.password;
        res.status(httpStatus.OK).send(user)
        
    })
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}


const index = (req, res) => {
    list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const resetPassword = (req, res) => {

    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`
    modify({email: req.body.email}, {password: passwordToHash(new_password)}).then( (updatedUser) => {
        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({error: "user not found"})

        eventEmitter.emit("send_email", {
            to: updatedUser.email, // list of receivers
            subject: "Şifre Sıfırlama", // Subject line
            html: `<p>Talebiniz üzerine şifre sıfırlanmıştır. <br> yeni şifreniz: ${new_password} </p>`, // html body
        })

        res.status(httpStatus.OK).send({
            message: "Mail has been sent to user email"
        })
    }).catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "An error occurred while updating passowrd."}))
}


const changePassword = (req, res) => {

    req.body.password = passwordToHash(req.body.password);
    
    // get user info from auth middleware
    modify({_id: req.userInfo._id }, req.body).then(updatedUser => {

        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({error: "user password has not been changed."})

        res.status(httpStatus.OK).send(updatedUser);

    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: e.message}))
}

const deleteUser = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "ID Info is missing"
        })
    }
    // get user id
    const { _id } = req.userInfo
    // remove blogs written by user
    removeBlogsForUser(_id).then(removedBlogs => {
        console.log(removedBlogs)
    }).catch( (e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )

    // remove comments posted by user
    removeCommentsForUser(_id).then(removedComments => {
        console.log(removedComments)
    }).catch( (e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )

    // remove reading lists created by user
    removeReadingListsForUser(_id).then(removedReadingLists => {
        console.log(removedReadingLists)
    }).catch( (e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )

    // find blogs where blogs.likedByUsers array contains current user id

    listBlogsLikedByCurrentUser(_id).then(blogs => {
        // loop through each blog
        blogs.forEach(blog => {
            // filter each blog so that deleted user does not exists in likedByUsers array
            blog.likedByUsers= blog.likedByUsers.filter((elem) => elem.user_id?.toString() !== _id)
            // save to db
            blog.save()
            
        })
    }).catch( (e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )

    // it is safe to remove user now
    remove(req.params?.id).then( (deletedUser) => {
  
        if(!deletedUser){
            return res.status(httpStatus.NOT_FOUND).send({
                message: "User is not being removed"
            })
        }
        res.status(httpStatus.OK).send({
            message: "User has been removed"
        });
    })
    .catch( (e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: e.message
    }) )
}


module.exports = {
    create,
    update,
    index,
    login,
    changePassword,
    deleteUser,
    resetPassword
}