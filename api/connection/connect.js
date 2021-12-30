var sql = require('mssql');
var connect = function (){

    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'P@ss5961',
        server: 'host.docker.internal',
        database: 'TESTDB',
        trustServerCertificate: true
    });

    return conn;
};

module.exports = connect;