const sql = require('mssql')



//get all courses
exports.list = function (req, res, next) {
    new sql.Request().execute('SelectAllQuestion')
        .then(result => {
            let questions = result.recordset;
            questions.forEach((Quest, index) => {

                new sql.Request()
                    .input('ansId', sql.Int, Quest.Correct_Answer)
                    .execute('GetCorrectAnswer')
                    .then(result => {
                        choise = result.recordset[0].Body;
                        Quest.Correct_Answer = choise

                        Quest = Object.assign(Quest, { 'Choices': [] });
                        new sql.Request()
                            .input('questionID', sql.Int, Quest.Ques_ID)
                            .execute('getQuestionChoices')
                            .then(result => {
                                result.recordset.forEach(Choice => {
                                    Quest.Choices.push(Choice.Body);
                                })
                                if (index == questions.length - 1)
                                    res.status(200).json({ message: "Questions data",data: questions });
                            })

                    })
            })

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}
exports.courseQuestions = function (req, res, next) {
    new sql.Request()
        .input('courseID', sql.Int, req.body.CrsId)
        .execute('getCourseQuestions')
        .then(result => {
            let questions = result.recordset;
            questions.forEach((Quest, index) => {

                new sql.Request()
                    .input('ansId', sql.Int, Quest.Correct_Answer)
                    .execute('GetCorrectAnswer')
                    .then(result => {
                        choise = result.recordset[0].Body;
                        Quest.Correct_Answer = choise

                        Quest = Object.assign(Quest, { 'Choices': [] });
                        new sql.Request()
                            .input('questionID', sql.Int, Quest.Ques_ID)
                            .execute('getQuestionChoices')
                            .then(result => {
                                result.recordset.forEach(Choice => {
                                    Quest.Choices.push(Choice.Body);
                                })
                                if (index == questions.length - 1)
                                    res.status(200).json({ message: "Questions data", data: questions});
                            })

                    })
            })

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}

exports.addQuestion = function (req, res, next) {
    new sql.Request()
        .input('body', sql.NVarChar(sql.MAX), req.body.body)
        .input('correctAnswer', sql.Int, null)
        .input('type', sql.NChar(10), req.body.type)
        .input('degree', sql.Int, req.body.degree)
        .input('courseId', sql.Int, req.body.CrsId)
        .execute('InsertQuestion')
        .then(result => {
            if(req.body.type == 'tf')
            {
                new sql.Request()
                    .execute('addTFChoices')
                    .then(result => {
                        new sql.Request()
                            .input('correctAnswer', sql.NVarChar(sql.MAX), req.body.correctAnswer)
                            .execute('setCorrectAnswerId')
                            .then(result => {
                                    res.status(200).json({ message:"Question added successfully" });
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
            else
            {
                let choices = req.body.choices;
                new sql.Request()
                    .input('ansBody1', sql.NVarChar(sql.MAX), choices[0])
                    .input('ansBody2', sql.NVarChar(sql.MAX), choices[1])
                    .input('ansBody3', sql.NVarChar(sql.MAX), choices[2])
                    .execute('addMCQChoices')
                    .then(result => {
                        new sql.Request()
                            .input('correctAnswer', sql.NVarChar(sql.MAX), req.body.correctAnswer)
                            .execute('setCorrectAnswerId')
                            .then(result => {
                                    res.status(200).json({ message:"Question added successfully" });
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
        })
        .catch(error => {
            error.status = 500;
            next(error);
        }) 
}
