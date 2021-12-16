const express = require('express');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const schemas = require('../validations/Comments');

const {
    index,
    getComment,
    createComment,
    updateComment,
    deleteComment,
} = require('../controllers/Comments');

const router = express.Router();

router.route('/').get(index);
router.route('/:id').get(authenticate, getComment);
router
    .route('/')
    .post(authenticate, validate(schemas.createValidation), createComment);
router
    .route('/:id')
    .patch(authenticate, validate(schemas.updateValidation), updateComment);
router.route('/:id').delete(authenticate, deleteComment);

module.exports = router;
