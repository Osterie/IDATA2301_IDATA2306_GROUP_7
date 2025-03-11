Create Table Favorit_Flights ( 
    flight_id INT NOT NULL,
    user_id INT NOT NULL,

    FOREIGN KEY (userid) REFERENCES user(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id),
);