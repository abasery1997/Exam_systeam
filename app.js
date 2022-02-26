const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql')
const server = express();


const config = require('./dbConfig')

//routes
const router = require('./routes/router');
const courseRouter = require('./routes/courses.router')
const instructorRouter = require('./routes/instructorsRouter')
const questionsRouter = require('./routes/questions.router')
const deptRouter = require('./routes/departmentRoute')
const generateExamRouter = require('./routes/generateExamRouter')

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




//main Page Routes
server.use('/home', router);

// parse application/json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/courses',courseRouter);
server.use('/instructors',instructorRouter);
server.use('/questions',questionsRouter);
server.use('/departments',deptRouter);
server.use('/generateExam',generateExamRouter);



//unknown paths
server.use((req, res, next) => {
  res.send(" unknown url paths");

});
//error
server.use((error, req, res, next) => {
  res.send("Error: " + error);

})