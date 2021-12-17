const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
// validations
const schemas = require('../validations/Users');
const {
    index,
    create,
    update,
    login,
    getCurrentUserSessionInfo,
    resetPassword,
    changePassword,
    deleteUser,
} = require('../controllers/Users');

const router = express.Router();

router.get('/', authenticate, index);
router.get('/whoami', authenticate, getCurrentUserSessionInfo);
router.route('/').post(validate(schemas.createValidation), create);
router
    .route('/')
    .patch(authenticate, validate(schemas.updateValidation), update);
router.route('/login').post(validate(schemas.loginValidation), login);
router
    .route('/reset-password')
    .post(validate(schemas.resetPasswordValidation), resetPassword);
router
    .route('/change-password')
    .patch(
        authenticate,
        validate(schemas.changePasswordValidation),
        changePassword
    );
router.route('/:id').delete(authenticate, deleteUser);

module.exports = router;
