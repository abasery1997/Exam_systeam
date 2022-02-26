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
                                res.status(200).json({ message: "Instructors data", data: insCrsArr });
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


exports.addInstructors = function(req, res, next){
    let password = generateRandomNumber(99999999, 10000000).toString();
    do{
        username = `${req.body.name}@${generateRandomNumber(999, 100)}`
    }while(isUniqueUsername(username) == 0);

    new sql.Request()
        .input('deptId', sql.Int, req.body.deptId)
        .input('Name', sql.VarChar(50), req.body.name)
        .input('userName', sql.VarChar(50), username)
        .input('type', sql.Char(1), req.body.type)
        .input('password', sql.NVarChar(sql.MAX), password)
        .execute('addUser')
        .then(result => {
            res.status(200).json({ message:"added successfully" });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        }) 
}

function generateRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isUniqueUsername(username)
{
    new sql.Request()
        .input('userName', sql.VarChar(50), username)
        .execute('isUniqueUserName')
        .then(result => {
            return result.recordset[0][''];
        })
        .catch(error => {
            error.status = 500;
            next(error);
        }) 
}
