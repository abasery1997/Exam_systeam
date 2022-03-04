const sql = require('mssql')
const { validationResult } = require("express-validator");


exports.generateExam = function (req, res, next) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    new sql.Request()
        .input('courseID', sql.Int, req.body.crsId)
        .execute('validExam')
        .then(result => {
            if (result.recordset[0].res == 'false') {
                res.status(204).json({ message:"in valid", data:[] });
            }
            else {
                new sql.Request()
                    .input('courseID', sql.Int, req.body.crsId)
                    .execute('getCourseStudent')
                    .then(result => {
                        console.log(result)
                        if (result.recordset[0].res == 'false') {
                            res.status(204).json({ message:"in valid", data:[] });
                        }
                        else{
                            result.recordset.forEach((student, index) => {
                                let noStudents = result.recordset.length;
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
                        }  
                })
                .catch(error => {
                    error.status = 500;
                    next(error);
                })               
            }
        })
}

exports.GetCompletedExams = function (req, res, next) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    new sql.Request()
        .input('stdId', sql.Int, req.body.stdId)
        .execute('GetStdCompletedExams')
        .then(result => {
            if (result.recordset[0].res == 'false') {
                res.status(204).json({ message:"no Exams",data:[] });
            }
            else {


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
                                    exam = Object.assign(exam, result.recordset[0]);
                                    if (index == examsArr.length - 1)
                                        res.status(200).json({ message: "Exams data", data: examsArr });
                                })
                            // response

                        })

                })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

exports.GetNotCompletedExams = function (req, res, next) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    new sql.Request()
        .input('stdId', sql.Int, req.body.stdId)
        .execute('GetStdNotCompletedExams')
        .then(result => {
            if (result.recordset[0].res == 'false') {
                res.status(204).json({ message: "No Exams" ,data:[]});
            } else {


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
                                    exam = Object.assign(exam, result.recordset[0]);
                                    if (index == examsArr.length - 1)
                                        res.status(200).json({ message: "Exams data", data: examsArr });
                                })
                            // response

                        })

                })
            }
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

exports.startExam = function (req, res, next) {
    new sql.Request()
        .input("examID", sql.Int, req.params.examId)
        .execute("getExamDuration")
        .then(result => {
            let QuesArr = result.recordset;
            QuesArr = Object.assign(QuesArr[0], { 'questions': [] });
            // Questions
            new sql.Request()
                .input('examID', sql.Int, req.params.examId)
                .execute('getExamQuestions')
                .then(result2 => {
                    result2.recordset.forEach((question, index) => {
                        QuesArr['questions'].push({ "content": question['Body'], "choices": [] });
                        // choices
                        new sql.Request()
                            .input('questionID', sql.Int, question['Ques_ID'])
                            .execute('getQuestionChoices')
                            .then(result3 => {
                                result3.recordset.forEach(choice => {
                                    QuesArr['questions'][index]["choices"].push({ "ansId": choice['Ans_ID'], "content": choice['Body'] });
                                })

                                if (index == QuesArr['questions'].length - 1)
                                    res.status(200).json({ message: "Exam started successfully", data: QuesArr });
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
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

exports.submitExam = function (req, res, next) {
    new sql.Request()
        .input("examId", sql.Int, req.body.examId)
        .input("ansId1", sql.Int, req.body.answers[0]['0'])
        .input("ansId2", sql.Int, req.body.answers[1]['1'])
        .input("ansId3", sql.Int, req.body.answers[2]['2'])
        .input("ansId4", sql.Int, req.body.answers[3]['3'])
        .input("ansId5", sql.Int, req.body.answers[4]['4'])
        .input("ansId6", sql.Int, req.body.answers[5]['5'])
        .input("ansId7", sql.Int, req.body.answers[6]['6'])
        .input("ansId8", sql.Int, req.body.answers[7]['7'])
        .input("ansId9", sql.Int, req.body.answers[8]['8'])
        .input("ansId10", sql.Int, req.body.answers[9]['9'])
        .execute("examAnswers")
        .then(result => {
            new sql.Request()
                .input("examId", sql.Int, req.body.examId)
                .execute("examCorrection")
                .then(result => {
                    new sql.Request()
                        .input("examId", sql.Int, req.body.examId)
                        .execute("getStudentDegree")
                        .then(result => {
                            res.status(200).json({ message: "Exam submitted successfully", data: result.recordset });
                        })
                        .catch(error => {
                            error.status = 500;
                            next(error);
                        })
                })
                .catch(error => {
                    error.status = 500;
                    next(error);
                })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}