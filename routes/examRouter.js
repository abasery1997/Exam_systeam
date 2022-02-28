const express = require("express");
const router = express.Router();

const examController = require("../controllers/examController");
const {adminAuthRequired} = require('../middleware/auth/authRequired.middleware')

//post
router.post("/generate",adminAuthRequired, examController.generateExam);

//post
router.post("/finishedstudentexams", examController.GetCompletedExams);
router.post("/notfinishedstudentexams", examController.GetNotCompletedExams);



module.exports = router;
