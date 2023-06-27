const mysql = require('mysql')
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,     //数据库IP地址
    user: process.env.MYSQL_USER,          //数据库登录账号
    password: process.env.MYSQL_PASSWORD,      //数据库登录密码
    database: process.env.MYSQL_DATABASE,       //要操作的数据库
    port: 3306
})

module.exports = db