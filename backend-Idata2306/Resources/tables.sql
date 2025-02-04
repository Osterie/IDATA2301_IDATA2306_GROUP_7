CREATE TABLE Price (
    flight_name VARCHAR(100) NOT NULL, -- Must match the referenced column type
    provider VARCHAR(64) NOT NULL,
    price INT NOT NULL,
    code CHAR(3) NOT NULL,
    FOREIGN KEY (flight_name) REFERENCES Flights(flight_name)
);