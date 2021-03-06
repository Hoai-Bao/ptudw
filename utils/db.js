
const mysql = require('mysql');
const util = require('util');
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'mydb_auction',
  multipleStatements:true
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => mysql_query(sql),
  updatebyId: (id,tablename,entity) => mysql_query(`update ${tablename} set ? where id = ${id}`,entity), 
  add: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
  findbyId: (tableName, id)=> mysql_query(`select * from ${tableName} where id = ?`,id),
  deletebyId: (tableName, id)=>mysql_query(`delete from ${tableName} where id = ?`,id),
  addimage: (entity) => mysql_query(`insert into image(filename, idproduct) values ('?', ?)`,entity)
};
