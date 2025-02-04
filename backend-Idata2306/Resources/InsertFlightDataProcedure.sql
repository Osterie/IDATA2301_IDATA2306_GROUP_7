DELIMITER $$

CREATE PROCEDURE InsertFlightData(
    IN p_flight_name VARCHAR(100),
    IN p_company VARCHAR(255),
    IN p_class_types JSON,
    IN p_extra_features JSON,
    IN p_departure_code CHAR(3),
    IN p_departure_city VARCHAR(255),
    IN p_destination_code CHAR(3),
    IN p_destination_city VARCHAR(255),
    IN p_flight_date DATE,
    IN p_prices JSON -- JSON array of objects containing provider, price, and currency
)
BEGIN
    -- Insert into Flight table
    INSERT INTO Flight (flight_name, company, class_types, extra_features)
    VALUES (
        p_flight_name, 
        p_company, 
        p_class_types, 
        p_extra_features
    );

    -- Insert into Airport table (if not already existing)
    INSERT IGNORE INTO Airport (code, city) VALUES (p_departure_code, p_departure_city);
    INSERT IGNORE INTO Airport (code, city) VALUES (p_destination_code, p_destination_city);

    -- Insert into Route table
    INSERT INTO Route (flight_name, departure, destination, flight_date)
    VALUES (
        p_flight_name, 
        p_departure_code, 
        p_destination_code, 
        p_flight_date
    );

    -- Parse JSON array for prices and insert into Price table
    DECLARE i INT DEFAULT 0;
    DECLARE total_items INT;
    DECLARE provider VARCHAR(64);
    DECLARE price INT;
    DECLARE currency CHAR(3);

    SET total_items = JSON_LENGTH(p_prices);

    WHILE i < total_items DO
        SET provider = JSON_UNQUOTE(JSON_EXTRACT(p_prices, CONCAT('$[', i, '].provider')));
        SET price = JSON_UNQUOTE(JSON_EXTRACT(p_prices, CONCAT('$[', i, '].price')));
        SET currency = JSON_UNQUOTE(JSON_EXTRACT(p_prices, CONCAT('$[', i, '].currency')));

        INSERT INTO Price (flight_name, provider, price, code)
        VALUES (p_flight_name, provider, price, currency);

        SET i = i + 1;
    END WHILE;

END$$

DELIMITER ;

-- Example usage
-- SET @p_flight_name = 'Delta Flight 425';
-- SET @p_company = 'Delta Air Lines';
-- SET @p_class_types = JSON_ARRAY('Economy');
-- SET @p_extra_features = JSON_ARRAY('Complimentary Wi-Fi', 'Seat-back Screens', 'Free Snacks');
-- SET @p_departure_code = 'JFK';
-- SET @p_departure_city = 'New York';
-- SET @p_destination_code = 'LAX';
-- SET @p_destination_city = 'Los Angeles';
-- SET @p_flight_date = '2025-08-15';
-- SET @p_prices = JSON_ARRAY(
--     JSON_OBJECT('provider', 'SkyScanner', 'price', 150, 'currency', 'USD'),
--     JSON_OBJECT('provider', 'Expedia', 'price', 175, 'currency', 'USD')
-- );

-- CALL InsertFlightData(
--     @p_flight_name,
--     @p_company,
--     @p_class_types,
--     @p_extra_features,
--     @p_departure_code,
--     @p_departure_city,
--     @p_destination_code,
--     @p_destination_city,
--     @p_flight_date,
--     @p_prices
-- );
