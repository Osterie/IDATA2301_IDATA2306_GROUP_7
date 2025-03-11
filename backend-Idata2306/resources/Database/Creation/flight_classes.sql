CREATE TABLE FlightClasses(
    ClassId INT NOT NULL,
    FlightId INT NOT NULL,
    AvailableSeats INT UNSIGNED NOT NULL,
    FOREIGN KEY (ClassId) REFERENCES class(Id),
    FOREIGN KEY (FlightId) REFERENCES flight(Id)
);