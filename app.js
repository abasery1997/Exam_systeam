const express = require('express');
const bodyParser = require('body-parser');


const server = express();
const router = require('./routes/router');
 

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));
server.use('/', router);
 
server.listen(8080, () => {
  console.log('Server Running');
});