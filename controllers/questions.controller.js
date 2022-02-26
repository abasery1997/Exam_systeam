const sql = require('mssql')



//get all courses
exports.list = function (req, res, next) {
    new sql.Request().execute('SelectAllQuestion')
        .then(result => {
            let questions = result.recordset;
            questions.forEach((Quest, index) => {
                if (Quest.Correct_Answer == 0) {
                    Quest.Correct_Answer = "False";
                } else if (Quest.Correct_Answer == 1) {
                    Quest.Correct_Answer = "True";
                }
                else {
                    //Quest.Correct_Answer= "mcqq"
                    new sql.Request()
                        .input('ansId', sql.Int, Quest.Correct_Answer)
                        .execute('GetCorrectAnswer')
                        .then(result => {
                            console.log(result.recordset[0].Body);
                            choise = result.recordset[0].Body;
                            Quest.Correct_Answer = choise
                        
                        })
                }
               
            })
           
            res.status(200).json({ message: "Questions data", questions });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}