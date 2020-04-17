const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'nodeuser',
    password:'node@node',
    database: 'agendapetshop'
})

module.exports = conexao