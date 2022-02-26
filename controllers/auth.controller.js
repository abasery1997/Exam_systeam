const sql = require('mssql')
const jwt = require('jsonwebtoken');

exports.login = function (req, res, next) {
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
            console.log(result.recordset[0][''])
            const user = { name: username };
            if (result.recordset[0][''] == 'true') {
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({ accessToken });
            } else {
                res.status(403).json({ message: "user data not correct" });
            }

        })
        .catch(error => {
            error.status = 500;
            next(error);
        })


}
