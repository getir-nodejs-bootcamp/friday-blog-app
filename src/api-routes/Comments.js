const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Comments");

const { index, getComment, createComment, updateComment, deleteComment} = require ("../controllers/Comments");

const router = express.Router();

router.route("/").get(index);
router.route("/:id").get(getComment);
router.route("/").post(validate(schemas.createValidation), createComment);
router.route("/:id").patch(validate(schemas.updateValidation), updateComment);
router.route("/:id").delete(deleteComment);

module.exports = router;