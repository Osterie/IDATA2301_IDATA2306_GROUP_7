CREATE TABLE route(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    DepartureAirportCode CHAR(3) NOT NULL,
    ArrivalAirportCode CHAR(3) NOT NULL,
    FOREIGN KEY (DepartureAirportCode) REFERENCES airport(AirportCode),
    FOREIGN KEY (ArrivalAirportCode) REFERENCES airport(AirportCode)
)