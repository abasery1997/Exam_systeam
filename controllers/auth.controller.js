const sql = require('mssql')
const jwt = require('jsonwebtoken');
const {validationResult}=require("express-validator");


exports.login = function (req, res, next) {
    let errors=   validationResult(req);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    //authentication user
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    new sql.Request()
        .input('userName', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .input('type', sql.NVarChar, type)
        .execute('isAUser')
        .then(result => {
            const user = { name: username ,type:type};
            if (result.recordset[0].ID == 'false') {
                res.status(403).json({ message: "user data not correct" });
            } else {
                let id = result.recordset[0].ID;
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({ accessToken,id });
            }

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })


}
