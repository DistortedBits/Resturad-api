const mysql = require('mysql');
const conf = require('./config.js')

const pool = mysql.createPool({
    connectionLimit: '10',
    host: conf.HOST,
    user: conf.USER,
    password: conf.PASSWORD,
    database: conf.DATABASE,
    port: conf.PORT,
    insecureAuth : true
});

/*pool.connect(error =>{
    if (error) throw error;
    console.log("Connection: established");
});*/

module.exports = pool;