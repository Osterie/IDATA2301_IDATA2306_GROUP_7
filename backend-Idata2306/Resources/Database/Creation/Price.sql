CREATE TABLE price(
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_id INT NOT NULL,
    price INT UNSIGNED NOT NULL,
    price_code CHAR(3) NOT NULL,
    provider VARCHAR(64),
    discount INT UNSIGNED DEFAULT 0,
    scheduled_flights_id INT NOT NULL,

    FOREIGN KEY (ClassId) REFERENCES class(Id),
    FOREIGN KEY (ScheduledFlightsId) REFERENCES scheduled_flights(Id),
    CONSTRAINT CHK_Price_Discount_Range CHECK (Discount BETWEEN 0 AND 100)
)