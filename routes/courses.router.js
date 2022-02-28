const express = require("express");
const router = express.Router();
const {list,addCourse} = require("../controllers/courses.controller");
const {body}=require("express-validator")

router.get('/list', list);
router.post('/add',[
    body("InsId").isInt().withMessage("Instructor ID should be Integer"),
    body("Name").isString().withMessage("Course Name should be String"),
    body("fTopicName").isString().withMessage("first topic Name should be String"),
    body("sTopicName").isString().withMessage("second topic Name should be String")
], addCourse);

module.exports = router;

