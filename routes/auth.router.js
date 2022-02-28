const express = require("express");
const router = express.Router();
const {body}=require("express-validator")

const {login} = require("../controllers/auth.controller");


router.post('', [
    body("username").isString().withMessage("username should be string"),
    body("password").isString().withMessage("password shouldn't be empty"),
    body("type").isIn(['a', 's']).withMessage("type should be a:(admin) or s:(student)"),
    
],login);

module.exports = router;

