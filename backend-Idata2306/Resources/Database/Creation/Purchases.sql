Create Table Purchases (
    UserId INT NOT NULL,
    Flight_Id INT NOT NULL,
    Price_Id INT NOT NULL,

    FOREIGN KEY (User_Id) REFERENCES User(Id),
    FOREIGN KEY (Flight_Id) REFERENCES Flight(Id),s
    FOREIGN KEY (Price_Id) REFERENCES Price(Id),
);
