const sql = require('mssql');

exports.getStudents = function (req, res, next) {
    new sql.Request()
        .input("StdID", sql.Int, req.body.stdId)
        .execute('getStudentCourses')
        .then(result => {
            let crsArr = [];
            result.recordset.forEach(course => {
                crsArr.push(course['Crs_Name']);
            })

            res.status(200).json({ message: "Students data", data: crsArr });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}
