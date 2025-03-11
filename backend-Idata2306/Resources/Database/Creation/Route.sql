CREATE TABLE Route(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    DepartureAirportCode CHAR(3) NOT NULL,
    ArrivalAirportCode CHAR(3) NOT NULL,
    FOREIGN KEY (DepartureAirportCode) REFERENCES Airport(AirportCode),
    FOREIGN KEY (ArrivalAirportCode) REFERENCES Airport(AirportCode)
)