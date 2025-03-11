CREATE TABLE scheduled_flights(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    flight_id INT NOT NULL,
    route_id INT NOT NULL,
    date DATE NOT NULL,

    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (route_id) REFERENCES route(id)
)