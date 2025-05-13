INSERT INTO flight_application.price (price, price_code, provider, discount, class_id, scheduled_flights_id)
VALUES
    (500, 'USD', 'Skyscanner', 0, 1, 21),  -- Flight 18, Route 1 (JFK to LAX)
    (400, 'NOK', 'CheapOair', 10, 2, 22),  -- Flight 19, Route 2 (ORD to AES)
    (550, 'EUR', 'Orbitz', 0, 8, 23),      -- Flight 20, Route 3 (AMS to LHR)
    (600, 'CHF', 'OneTravel', 5, 7, 24),   -- Flight 21, Route 4 (FCO to CDG)
    (450, 'EUR', 'Travelocity', 0, 1, 25), -- Flight 22, Route 5 (DFW to FRA)
    (700, 'USD', 'Google Flights', 15, 8, 26),  -- Flight 23, Route 6 (HND to DXB)
    (650, 'EUR', 'JustFly', 0, 2, 27),     -- Flight 24, Route 7 (DOH to SYD)
    (800, 'USD', 'eDreams', 10, 7, 28),    -- Flight 25, Route 8 (SIN to JFK)
    (550, 'AED', 'Priceline', 5, 4, 29),   -- Flight 26, Route 9 (AMS to ZRH)
    (450, 'QAR', 'American Airlines Website', 0, 1, 30);  -- Flight 27, Route 10 (CDG to DFW)

