CREATE TABLE IF NOT EXISTS Counters(
	counter_id INT PRIMARY KEY AUTO_INCREMENT
);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
