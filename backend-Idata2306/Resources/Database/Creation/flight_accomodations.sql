CREATE TABLE flight_accommodations (
    flight_id INT NOT NULL,
    feature_id INT NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (feature_id) REFERENCES extra_feature(id)
);
