require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql')
const jwt = require('jsonwebtoken');

const server = express();


const config = require('./dbConfig')
const {AuthRequired} = require('./middleware/auth/authRequired.middleware')

//routes
const authRouter = require('./routes/auth.router');
const router = require('./routes/router');
const courseRouter = require('./routes/courses.router')
const instructorRouter = require('./routes/instructorsRouter')
const studentRouter = require('./routes/student.router')
const questionsRouter = require('./routes/questions.router')
const deptRouter = require('./routes/departmentRoute')
const examRouter = require('./routes/examRouter')

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
server.use(express.json());
server.use('/login',authRouter);
server.use('/courses',AuthRequired,courseRouter);
server.use('/instructors',AuthRequired,instructorRouter);
server.use('/students',AuthRequired,studentRouter);
server.use('/questions',AuthRequired,questionsRouter);
server.use('/departments',AuthRequired,deptRouter);
server.use('/exam',AuthRequired,examRouter);



//unknown paths
server.use((req, res, next) => {
  res.status(404).json({ message:"Page Not Found"});
});
//error
server.use((error, req, res, next) => {
  res.status(500).json(error);

})