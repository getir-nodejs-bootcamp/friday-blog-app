const express = require("express");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
// validations
const schemas = require("../validations/Users");
const { create, index, login } = require ("../controllers/Users");

const router = express.Router();

router.get("/", authenticate, index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login)

module.exports = router