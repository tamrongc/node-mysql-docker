CREATE TABLE Student(
	student_id INT PRIMARY KEY AUTO_INCREMENT,
	student_name VARCHAR(60),
	student_age INT
);

INSERT INTO Student(student_name, student_age) VALUES("Shubham verma", 21);
INSERT INTO Student(student_name, student_age) VALUES("Utkarsh Rickey", 23);
INSERT INTO Student(student_name, student_age) VALUES("Gerard verma", 25);
INSERT INTO Student(student_name, student_age) VALUES("Donald Alfredo", 22);
INSERT INTO Student(student_name, student_age) VALUES("Roman Elias", 19);
INSERT INTO Student(student_name, student_age) VALUES("Rickey Joe", 20);
INSERT INTO Student(student_name, student_age) VALUES("Stanley Jamie", 21);
INSERT INTO Student(student_name, student_age) VALUES("Dwayne Jamie", 22);
INSERT INTO Student(student_name, student_age) VALUES("Jan Shawn", 22);
INSERT INTO Student(student_name, student_age) VALUES("Cameron verma", 21);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
