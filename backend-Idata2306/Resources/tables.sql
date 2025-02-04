CREATE TABLE Price (
    flight_name VARCHAR(100) NOT NULL, -- Must match the referenced column type
    provider VARCHAR(64) NOT NULL,
    price INT NOT NULL,
    code CHAR(3) NOT NULL,
    FOREIGN KEY (flight_name) REFERENCES Flights(flight_name)
);

CREATE TABLE Flight (
    flight_name VARCHAR(100) PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    class_types JSON,
    extra_features JSON
);

CREATE TABLE Airport (
    code CHAR(3) PRIMARY KEY,
    city VARCHAR(255) NOT NULL
);
