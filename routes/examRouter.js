const express = require("express");
const router = express.Router();

const examController = require("../controllers/examController");


//post
router.post("/generate", examController.generateExam);

//post
router.post("/finishedstudentexams", examController.GetCompletedExams);
router.post("/notfinishedstudentexams", examController.GetNotCompletedExams);



module.exports = router;
