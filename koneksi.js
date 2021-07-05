// import mysql module 
var mysql = require('mysql');

exports.myConnection = function(){
	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'node_inventory'
	});

	conn.connect((err)=>{
		if (err) throw err;
		console.log('mysql connected');
	});

	return conn;
}