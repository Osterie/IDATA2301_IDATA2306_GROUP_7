CREATE TABLE IF NOT EXISTS airport(
    airport_code CHAR(3) PRIMARY KEY,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS class(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name Varchar(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS flight(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name Varchar(100) NOT NULL,
    company Varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS extra_feature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name Varchar(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS route(
    id INT PRIMARY KEY AUTO_INCREMENT,
    departure_airport_code CHAR(3) NOT NULL,
    arrival_airport_code CHAR(3) NOT NULL,
    FOREIGN KEY (departure_airport_code) REFERENCES airport(airport_code),
    FOREIGN KEY (arrival_airport_code) REFERENCES airport(airport_code)
);

CREATE TABLE IF NOT EXISTS scheduled_flights(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    flight_id INT NOT NULL,
    route_id INT NOT NULL,
    date DATE NOT NULL,

    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (route_id) REFERENCES route(id)
);

Create Table IF NOT EXISTS favorite_flights ( 
    flight_id INT NOT NULL,
    user_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);

CREATE TABLE IF NOT EXISTS flight_accommodation (
    flight_id INT NOT NULL,
    feature_id INT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (feature_id) REFERENCES extra_feature(id)
) AUTO_INCREMENT = 21;

CREATE TABLE IF NOT EXISTS flight_classes(
    class_id INT NOT NULL,
    flight_id INT NOT NULL,
    available_seats INT UNSIGNED NOT NULL,

    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);

CREATE TABLE IF NOT EXISTS price(
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,
    price INT UNSIGNED NOT NULL,
    price_code CHAR(3) NOT NULL,
    provider VARCHAR(64),
    discount INT UNSIGNED DEFAULT 0,
    scheduled_flights_id INT NOT NULL,

    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (scheduled_flights_id) REFERENCES scheduled_flights(id),
    CONSTRAINT CHK_Price_Discount_Range CHECK (discount BETWEEN 0 AND 100)
);

Create Table IF NOT EXISTS purchases (
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    price_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (price_id) REFERENCES price(id)
);
