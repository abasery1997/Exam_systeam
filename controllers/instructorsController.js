const sql = require('mssql');


exports.getInstructors = function(req, res, next){
    new sql.Request().execute('getInstructors')
        .then(result => {
            let insCrsArr = result.recordset;
            insCrsArr.forEach((instructor, index) => {
                // add courses for each instructor
                instructor = Object.assign(instructor, {'courses': []});
                new sql.Request()
                    .input('instructorID', sql.Int, instructor['Id'])
                    .execute('getInstructorCourses')
                        .then(result => {
                            result.recordset.forEach(course => {
                                instructor['courses'].push(course['Crs_Name']);
                            })
                            // response
                            if(index == insCrsArr.length-1)
                                res.status(200).json(insCrsArr);
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
