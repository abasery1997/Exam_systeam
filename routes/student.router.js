const express = require("express");
const router = express.Router();

const {getStudents}=require("../controllers/student.controller");


//get
router.get("", getStudents);

module.exports = router;
