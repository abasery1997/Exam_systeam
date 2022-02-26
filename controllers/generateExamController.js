const sql = require('mssql')


exports.generateExam = function(req, res, next){
    new sql.Request()
        .input('courseId', sql.Int, req.body.crsId)
        .execute('getCourseStudent')
        .then(result => {
            result.recordset.forEach((student, index) => {
                let noStudents = result.recordset.length-1;
                new sql.Request()
                    .input('courseId', sql.Int, req.body.crsId)
                    .input('studentId', sql.Int, student['Std_ID'])
                    .input('T_F', sql.Int, req.body.TFQNumber)
                    .input('MCQ', sql.Int, req.body.MCQNumber)
                    .input('duration', sql.Int, req.body.duration)
                    .execute('generateExam')
                    .then(result => {
                        if(index == noStudents-1)
                            res.status(200).json({ message:"Exam generated successfully" });
                    })
                    .catch(error => {
                        error.status = 500;
                        next(error);
                    }) 
            })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })   
}
