//requires
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require("mysql");
var Promise = require("bluebird");

//set up the connection to the DB containing the table you want to monitor
var pool = mysql.createPool({
      host              :   'your_host_here',
      user              :   'your_user_here',
      password          :   'user_password_here',
      database          :   'your_DB_here'
})

//name of the table to monitor
var table = 'db_table_here';

//fetch the number of rows from the table. returns promise.
function getCount(){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if (err){
				console.log((new Date()).toString());
				console.log(err);
				reject(err);
			}else{
				connection.query('SELECT COUNT(*) AS cnt FROM ' + table, function(err, rows, fields){
					connection.release();
					if (err){ 
						console.log((new Date()).toString());
						console.log(err);
						reject(err);
					}else{			
						resolve(parseInt(rows[0].cnt));						
					}		
				});
			}
		});		
	});	
}

//tell express to make the /public folder available to the world
app.use(express.static(__dirname + '/public')); 

//return index.html as the landing page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var offset = 0; //number of dud records you dont want counted in the table, like test users.
var check_interval = 5000; //in milliseconds

//check the db for a fresh count every interval based on 'check_interval'
setInterval(function(){			
	getCount().then(function(count){
		io.emit('update', (count - offset));//shoot the count to index.htm	
	})					
}, check_interval);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
