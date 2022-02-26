const express = require("express");
const router = express.Router();
const {list,courseQuestions} = require("../controllers/questions.controller");


router.get('/list', list);
router.get('/courseQuestions', courseQuestions);

module.exports = router;
