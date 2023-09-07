const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.static('public'));

const connection = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

app.listen(5000, () => console.log('listining on port 5000'));
app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html'); });

app.get('/count', (req, res) => {
	connection.query('SELECT COUNT(*) as count FROM Counters;' , (err, result) => {
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

app.post('/click-up', (req, res) => {
	connection.query('INSERT INTO Counters VALUE(NULL);' , (err, result) => {
		if(err){
			res.send(err);
		}
		else{
			res.sendStatus(200);
		}
	});
  });

  app.delete('/click-down', (req, res) => {
	connection.query('DELETE FROM Counters LIMIT 1;' , (err, result) => {
		if(err){
			res.send(err);
		}
		else{
			res.sendStatus(200);
		}
	});
  });
  