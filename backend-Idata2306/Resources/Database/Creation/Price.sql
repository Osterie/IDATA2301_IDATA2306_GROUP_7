CREATE TABLE price (
    id INT PRIMARY KEY AUTO_INCREMENT,
    price INT UNSIGNED NOT NULL,
    price_code CHAR(3) NOT NULL,
    provider VARCHAR(64),
    discount INT UNSIGNED DEFAULT 0,
    class_id INT NOT NULL,
    scheduled_flights_id INT NOT NULL,

    FOREIGN KEY (class_id) REFERENCES flight_classes(id),
    FOREIGN KEY (scheduled_flights_id) REFERENCES scheduled_flights(id),
    CONSTRAINT CHK_Price_Discount_Range CHECK (discount BETWEEN 0 AND 100)
);