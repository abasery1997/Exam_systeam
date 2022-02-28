const express = require("express");
const router = express.Router();
const { body } = require("express-validator")

const examController = require("../controllers/examController");
const { adminAuthRequired } = require('../middleware/auth/authRequired.middleware')

// start exam
router.get('/startExam', examController.startExam);

//post
router.post("/generate", adminAuthRequired, [
    body("crsId").isInt().withMessage("Course ID should be Integer"),
    body("TFQNumber").isInt().withMessage("TFQNumber should be Integer"),
    body("MCQNumber").isInt().withMessage("MCQNumber should be Integer"),
    body("duration").isInt().withMessage("duration should be Integer")

], examController.generateExam);

//post
router.post("/finishedstudentexams", [
    body("stdId").isInt().withMessage("Student ID should be Integer")
], examController.GetCompletedExams);

router.post("/notfinishedstudentexams", [
    body("stdId").isInt().withMessage("Student ID should be Integer")
], examController.GetNotCompletedExams);

//end exam and send student's answers
router.post('/submitExam', [
    body("examId").isInt().withMessage("Exam ID should be Integer"),
    body("answers").isArray().withMessage("Answers should be Array")
], examController.submitExam);


module.exports = router;
