const express = require("express");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
// validations
const schemas = require("../validations/Users");
const { create, index, login, resetPassword, changePassword, deleteUser } = require ("../controllers/Users");

const router = express.Router();

router.get("/", authenticate, index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), resetPassword);
router.route("/change-password").patch(authenticate, validate(schemas.changePasswordValidation), changePassword);
router.route("/:id").delete(authenticate, deleteUser);

module.exports = router