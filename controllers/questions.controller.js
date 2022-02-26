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
                                    res.status(200).json({ message: "Questions data", questions });
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
                                    res.status(200).json({ message: "Questions data", questions });
                            })

                    })
            })

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}