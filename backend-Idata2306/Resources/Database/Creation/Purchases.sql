Create Table purchases (
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    price_id INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id),
    FOREIGN KEY (price_id) REFERENCES price(id)
);
