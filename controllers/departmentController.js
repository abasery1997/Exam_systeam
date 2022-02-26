const mssql = require("mssql");

//get all departments
exports.getDepartments = function (req, res, next) {
    new mssql.Request().execute('SelectAllDepartment')
        .then(result => {
            res.status(200).json({ message: "All depts data", data: result.recordset });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}