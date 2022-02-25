const express = require("express");
const router = express.Router();
const {list,addCourse} = require("../controllers/courses.controller");


router.get('/list', list);
router.post('/add', addCourse);

module.exports = router;

