CREATE TABLE flight_classes(
    class_id INT NOT NULL,
    flight_id INT NOT NULL,
    available_seats INT UNSIGNED NOT NULL,
    FOREIGN KEY (class_id) REFERENCES class(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);