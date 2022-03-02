const express = require("express");
const router = express.Router();

const {getStudents}=require("../controllers/student.controller");


//get
router.get("/:stdId", getStudents);

module.exports = router;
