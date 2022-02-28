const sql = require('mssql')
const {validationResult}=require("express-validator");


//get all courses
exports.list = function (req, res, next) {
    new sql.Request().execute('SelectAllCourse')
        .then(result => {
            res.status(200).json({ message: "Courses data", data: result.recordset });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

//add a course and two topics

exports.addCourse = function (req, res, next) {
    let errors=   validationResult(req);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    //course data
    new sql.Request()
        .input('Name', sql.NVarChar, req.body.Name)
        .input('Insructor_id', sql.Int, req.body.InsId)
        .input('FirstTopName', sql.NVarChar, req.body.fTopicName)
        .input('SecondTopName', sql.NVarChar, req.body.sTopicName)
        .execute('CreateCourse')
        .then(result => {
             res.status(200).json({ message:"course Added successfully" });

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}
