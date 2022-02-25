const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql')
const server = express();


const config = require('./dbConfig')

//routes
const router = require('./routes/router');

// connect to database then listing to server
sql.connect(config)
  .then(() => {
    console.log(" Connected to database ");
    server.listen(process.env.PORT || 8080, () => {
      console.log(`listening to port 8080 `)
    });
  })
  .catch(err => {
    console.log("Failed to connect Msg: "+err.toString());
  })



// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//All Routes
server.use('/', router);


//unknown paths
server.use((req, res, next) => {
  res.send(" unknown url paths");

});
//error
server.use((error, req, res, next) => {
  res.send("Error: " + error);

})