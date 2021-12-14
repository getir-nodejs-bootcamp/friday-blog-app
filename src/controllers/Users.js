const httpStatus = require("http-status");
const { insert, list, loginUser } = require("../services/Users");
const { passwordToHash, comparePassword } = require("../scripts/utils/passwordUtil");
const { generateAccessToken } = require("../scripts/utils/tokenUtil");

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    insert(req.body).then(response => {
        res.status(httpStatus.CREATED).send(response);
    }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
};

const login = (req, res) => {

    const { email } = req.body
    loginUser({email: email})
    .then( user => {

        const passwordMatch = comparePassword(req.body.password, user.password);

        if (!passwordMatch) 
            return res.status(httpStatus.NOT_FOUND).send({message: "User not found"});
        
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

module.exports = {
    create,
    index,
    login
}