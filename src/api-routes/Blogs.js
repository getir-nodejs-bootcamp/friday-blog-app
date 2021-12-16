const express = require("express");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const schemas = require("../validations/Blogs");

const { index, getBlog, createBlog, updateBlog, deleteBlog, sendLikeFlag} = require ("../controllers/Blogs");

const router = express.Router();

router.route("/").get(index);
router.route("/:id").get(authenticate, getBlog);
router.route("/").post(authenticate, validate(schemas.createValidation), createBlog);
router.route("/:id").patch(authenticate, validate(schemas.updateValidation), updateBlog);
router.route("/:id/like-flag").patch(authenticate, validate(schemas.sendLikeFlagValidation), sendLikeFlag);
router.route("/:id").delete(authenticate, deleteBlog);

module.exports = router;