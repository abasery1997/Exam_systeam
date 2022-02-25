const sql = require('mssql')




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