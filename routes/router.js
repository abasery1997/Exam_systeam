const express = require('express');
const Controller = require('../controllers/controller');
 
const router = express.Router();
 
router.use('/', Controller.main);
 
module.exports = router;