CREATE TABLE route(
    id INT PRIMARY KEY AUTO_INCREMENT,
    departure_airport_code CHAR(3) NOT NULL,
    arrival_airport_code CHAR(3) NOT NULL,
    FOREIGN KEY (departure_airport_code) REFERENCES airport(airport_code),
    FOREIGN KEY (arrival_airport_code) REFERENCES airport(airport_code)
);