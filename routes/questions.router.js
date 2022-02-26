const express = require("express");
const router = express.Router();
const {list} = require("../controllers/questions.controller");


router.get('/list', list);

module.exports = router;
