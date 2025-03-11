CREATE TABLE Price(
    ClassId INT NOT NULL,
    Price INT UNSIGNED NOT NULL,
    PriceCode CHAR(3) NOT NULL,
    Provider VARCHAR(64),
    Discount INT UNSIGNED DEFAULT 0,
    ScheduledFlightsId INT NOT NULL,
    
    FOREIGN KEY (ClassId) REFERENCES Class(Id),
    FOREIGN KEY (ScheduledFlightsId) REFERENCES ScheduledFlights(Id),
    CONSTRAINT CHK_Price_Discount_Range CHECK (Discount BETWEEN 0 AND 100)
)