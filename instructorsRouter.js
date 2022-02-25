const express = require("express");
const router = express.Router();

const instructorController=require("../controllers/instructorsController");


//get
router.get("", instructorController.getInstructors);



module.exports = router;
