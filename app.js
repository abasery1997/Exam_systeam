const express = require('express');
const bodyParser = require('body-parser');


const server = express();
const router = require('./routes/router');
 


server.listen(8080, () => {
  console.log('Server Running');
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

server.use('/', router);
 

//unknown paths
server.use((req, res, next) => {
    res.send(" unknown url paths");

});
//error
server.use((error, req, res, next) => {
    res.send("Error: " + error);

})