
CREATE DATABASE brunchclub_db;
USE brunchclub_db;

CREATE TABLE reviews
(
	id int NOT NULL AUTO_INCREMENT,
	restaurant_name varchar(50) NOT NULL,
	neighborhood varchar(50) NOT NULL,
	cost varchar (10) NOT NULL,
    drinks bit (1) NOT NULL,
	PRIMARY KEY (id)
);

