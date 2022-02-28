const sql = require('mssql');

exports.getStudents = function (req, res, next) {
    new sql.Request().execute('getStudents')
        .then(result => {
            let stdCrsArr = result.recordset;
            stdCrsArr.forEach((student, index) => {
                // add courses for each student
                student = Object.assign(student, { 'courses': [] });
                new sql.Request()
                    .input('StdID', sql.Int, student['Id'])
                    .execute('getStudentCourses')
                    .then(result => {
                        result.recordset.forEach(course => {
                            student['courses'].push(course['Crs_Name']);
                        })
                        // response
                        if (index == stdCrsArr.length - 1)
                            res.status(200).json({ message: "Students data", data: stdCrsArr });
                    })
            })
        })
        .catch(error => {
            error.status = 500;
            next(error);
        })
}