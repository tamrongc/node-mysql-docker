const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

const connection = new mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.PORT,
	ssl: {
		rejectUnauthorized: false
	}
});

connection.connect(
	function (err) {
		if (err) {
			console.log("!!! Cannot connect !!! Error:");
			throw err;
		}
		else {
			console.log("Connection established.");
			connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, function (err, results) {
				if (err) {
					throw err;
				}

				connection.query(`USE ${process.env.DATABASE}`, function (err, results) {
					if (err) {
						throw err;
					}
					connection.query(`CREATE TABLE IF NOT EXISTS Counters(counter_id BIGINT PRIMARY KEY AUTO_INCREMENT);`, function (err, results) {
						if (err) {
							throw err;
						}
					});
					app.listen(5000, () => console.log('listining on port 5000'));
				});
			});
		}
	});

app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html'); });

app.get('/count', (req, res) => {
	try {
		let query = "SELECT COUNT(*) as count FROM Counters;";
		connection.query(query, function (err, result) {
			if (err) {
				res.send(err);
			}
			else {
				res.send(result);
			}
		});
	}
	catch (err) {
		res.send(err);
	}
});

app.post('/click-up', (req, res) => {
	try {
		let query = "INSERT INTO Counters VALUE(NULL);";
		connection.query(query);
		res.sendStatus(200);
	}
	catch (err) {
		res.send(err);
	}

});

app.delete('/click-down', async (req, res) => {
	try {
		let query = "DELETE FROM Counters LIMIT 1;";
		connection.query(query);
		res.sendStatus(200);
	}
	catch (err) {
		res.send(err);
	}
});
