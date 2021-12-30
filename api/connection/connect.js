

var sql = require('mssql');
var connect = function (){

    var conn = new sql.ConnectionPool({
        user: process.env.db_user,
        password: process.env.db_password,        
        server: process.env.db_server,
        database: 'TESTDB',
        trustServerCertificate: true
    });

    return conn;
};

module.exports = connect;