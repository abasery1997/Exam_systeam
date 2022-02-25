const config = require('./dbConfig')
const sql = require('mssql')


async function getSt() {
    try {
        let value = 5
        let pool = await sql.connect(config);
        let result1 = await pool.request().query('select * from students')
            
        // stored procedure
        let result2 = await pool.request()
            //.input('courseID', sql.Int, value)
            //.output('output_parameter', sql.VarChar(50))
            .execute('SelectAllCourse')

        //console.dir(result1.recordset);
        return result2.recordset;

    } catch (err) {
        // ... error checks
        return new Error(err.toString());
    }
}

getSt().then(result => {
    console.log(result)
    console.log("-----------------------------------------------")
    for(let i in result)
    {
        for(let v in result[i])
        {
            console.log(`${v}: ${result[i][v]}`);
        }
    }
})

sql.on('error', err => {
    // ... error handler
    console.log(err)
})