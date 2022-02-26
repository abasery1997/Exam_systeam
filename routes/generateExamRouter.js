const express = require("express");
const router = express.Router();

const generateExamController = require("../controllers/generateExamController");


//post
router.post("", generateExamController.generateExam);



module.exports = router;
