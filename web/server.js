const express = require('express');
const mariadb = require('mariadb');
const app = express();
app.use(express.static('public'));

const pool = mariadb.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test',
	bigIntAsNumber:true,
	connectionLimit: 10,
	acquireTimeout: 30000
});

app.listen(5000, () => console.log('listining on port 5000'));
app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html'); });

app.get('/count', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		let query = "SELECT COUNT(*) as count FROM Counters;";
		let result = await connection.query(query);
		res.send(result);
	}
	catch (err) {
		res.send(err);
	} finally {
		if (connection) {
			connection.end();
		}
	}
});

app.post('/click-up', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		let query = "INSERT INTO Counters VALUE(NULL);";
		await connection.query(query);
		res.sendStatus(200);
	}
	catch (err) {
		res.send(err);
	} finally {
		if (connection) {
			connection.end();
		}
	}
});

app.delete('/click-down', async (req, res) => {
	let connection;
	try {
		connection = await pool.getConnection();
		let query = "DELETE FROM Counters LIMIT 1;";
		await connection.query(query);
		res.sendStatus(200);
	}
	catch (err) {
		res.send(err);
	} finally {
		if (connection) {
			connection.release();
		}
	}
});
