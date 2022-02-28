const express = require("express");
const router = express.Router();
const {body}=require("express-validator")

const {list, courseQuestions, addQuestion} = require("../controllers/questions.controller");


router.get('/list', list);
router.get('/courseQuestions', [
    body("CrsId").isInt().withMessage("Course ID should be Integer"),
],courseQuestions);
router.post('', [
    body("body").isString().withMessage("Question body should be string"),
    body("type").isIn(['m', 'tf']).withMessage("question type should be m:(mcq) or tf:(true or false)"),
    body("degree").isInt().withMessage("degree should be number"),
    body("CrsId").isInt().withMessage("degree should be integer")


],addQuestion);

module.exports = router;
