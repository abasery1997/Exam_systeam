const sql = require('mssql')


exports.generateExam = function (req, res, next) {
    new sql.Request()
        .input('courseId', sql.Int, req.body.crsId)
        .execute('getCourseStudent')
        .then(result => {
            result.recordset.forEach((student, index) => {
                let noStudents = result.recordset.length - 1;
                new sql.Request()
                    .input('courseId', sql.Int, req.body.crsId)
                    .input('studentId', sql.Int, student['Std_ID'])
                    .input('T_F', sql.Int, req.body.TFQNumber)
                    .input('MCQ', sql.Int, req.body.MCQNumber)
                    .input('duration', sql.Int, req.body.duration)
                    .execute('generateExam')
                    .then(result => {
                        if (index == noStudents - 1)
                            res.status(200).json({ message: "Exam generated successfully" });
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
exports.GetCompletedExams = function (req, res, next) {
    new sql.Request()
        .input('stdId', sql.Int, req.body.stdId)
        .execute('GetStdCompletedExams')
        .then(result => {
            let examsArr = result.recordset;
            examsArr.forEach((exam, index) => {
                exam = Object.assign(exam, { 'topics': [] });
                new sql.Request()
                    .input('courseID', sql.Int, exam.Crs_ID)
                    .execute('getTopicsInfo')
                    .then(result => {
                        result.recordset.forEach(topic => {
                            exam.topics.push(topic.Top_Name);
                        })

                        new sql.Request()
                            .input('examID', sql.Int, exam.Exam_ID)
                            .execute('getFullMarkExam')
                            .then(result => {
                                console.log(result.recordset[0])
                                exam = Object.assign(exam, result.recordset[0]);
                                if (index == examsArr.length - 1)
                                    res.status(200).json({ message: "Exams data", data: examsArr });
                            })
                        // response

                    })

            })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}
exports.GetNotCompletedExams = function (req, res, next) {
    new sql.Request()
        .input('stdId', sql.Int, req.body.stdId)
        .execute('GetStdNotCompletedExams')
        .then(result => {
            let examsArr = result.recordset;
            examsArr.forEach((exam, index) => {
                exam = Object.assign(exam, { 'topics': [] });
                new sql.Request()
                    .input('courseID', sql.Int, exam.Crs_ID)
                    .execute('getTopicsInfo')
                    .then(result => {
                        result.recordset.forEach(topic => {
                            exam.topics.push(topic.Top_Name);
                        })

                        new sql.Request()
                            .input('examID', sql.Int, exam.Exam_ID)
                            .execute('getFullMarkExam')
                            .then(result => {
                                console.log(result.recordset[0])
                                exam = Object.assign(exam, result.recordset[0]);
                                if (index == examsArr.length - 1)
                                    res.status(200).json({ message: "Exams data", data: examsArr });
                            })
                        // response

                    })

            })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}
