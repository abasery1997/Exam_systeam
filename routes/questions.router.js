const express = require("express");
const router = express.Router();
const {list, courseQuestions, addQuestion} = require("../controllers/questions.controller");


router.get('/list', list);
router.get('/courseQuestions', courseQuestions);
router.post('', addQuestion);

module.exports = router;
