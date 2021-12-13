const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Blogs");

const { index, getBlog, createBlog, updateBlog, deleteBlog} = require ("../controllers/Blogs");

const router = express.Router();

router.route("/").get(index);
router.route("/:id").get(getBlog);
router.route("/").post(validate(schemas.createValidation), createBlog);
router.route("/:id").patch(validate(schemas.updateValidation), updateBlog);
router.route("/:id").delete(deleteBlog);

module.exports = router;