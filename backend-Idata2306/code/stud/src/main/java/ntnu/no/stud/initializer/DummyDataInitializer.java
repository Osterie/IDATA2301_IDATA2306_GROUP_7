package ntnu.no.stud.initializer;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.jdbc.core.JdbcTemplate;

import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import java.nio.file.Files;
import java.nio.file.Paths;







@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private static final Logger logger = LoggerFactory.getLogger(DummyDataInitializer.class);

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private FlightAccommodationRepository flightAccommodationRepository;

    @Autowired
    private ExtraFeatureRepository extraFeatureRepository;

    @Autowired
    private ScheduledFlightsRepository scheduledFlightsRepository;

    @Autowired
    private FlightInitializer flightInitializer;

    @Autowired
    private RouteInitializer routeInitializer;

    @Autowired
    private PriceInitializer priceInitializer;

    @Autowired
    private FlightAccommodationInitializer flightAccommodationInitializer;


    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        //TODO: remove return    
        // if (true) {
        //     return;
        // }

        // Step 1: Load data from SQL files if necessary
        createTables();

        if (airportRepository.count() == 0) {
            loadAirports();
        }
        if (routeRepository.count() == 0) {
            loadRoute();
        }
        if (flightRepository.count() == 0) {
            loadFlight();
        }
        if (priceRepository.count() == 0) {
            loadPrices();
        }
        if (extraFeatureRepository.count() == 0) {
            loadExtraFeatures();
        }
        if (flightAccommodationRepository.count() == 0) {
            loadFlightAccommodations();
        }
        if (scheduledFlightsRepository.count() == 0) {
            loadScheduled_flights();
        }


        // Step 2: Use initializers to generate random data
        if (routeRepository.count() > 0 && flightRepository.count() == 0) {
            flightInitializer.generateRandomFlights(100); // Generate 100 random flights
        }
        
        if (airportRepository.count() > 0 && routeRepository.count() == 0) {
            routeInitializer.generateRandomRoutes(10); // Generate 10 random routes
        }
        
        if (flightRepository.count() > 0 && priceRepository.count() == 0) {
            priceInitializer.generateRandomPrices(50); // Generate 50 random prices
        }
        
        if (flightRepository.count() > 0 && extraFeatureRepository.count() > 0) {
            flightAccommodationInitializer.generateRandomFlightAccommodations(); // Generate flight accommodations
        }
    }







    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void loadScheduledFlights() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.scheduled_flights (`date`, flight_id, route_id)\r\n" + 
                                "VALUES\r\n" + 
                                "    ('2025-04-01', 18, 1),  -- Delta Flight 425, JFK to LAX\r\n" + 
                                "    ('2025-04-02', 19, 2),  -- Norwegian Flight 708, ORD to AES\r\n" + 
                                "    ('2025-04-03', 20, 3),  -- KLM Flight 605, AMS to LHR\r\n" + 
                                "    ('2025-04-04', 21, 4),  -- Swiss Flight 110, FCO to CDG\r\n" + 
                                "    ('2025-04-05', 22, 5),  -- Alitalia Flight 560, DFW to FRA\r\n" + 
                                "    ('2025-04-06', 23, 6),  -- AA Flight 220, HND to DXB\r\n" + 
                                "    ('2025-04-07', 24, 7),  -- Lufthansa Flight 445, DOH to SYD\r\n" + 
                                "    ('2025-04-08', 25, 8),  -- Air France Flight 123, SIN to JFK\r\n" + 
                                "    ('2025-04-09', 26, 9),  -- Emirates Flight 204, AMS to ZRH\r\n" + 
                                "    ('2025-04-10', 27, 10); -- Qatar Airways Flight 905, CDG to DFW";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Scheduled flights loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load scheduled flights.", e);
        }
    }

    public void loadAirports() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.airport (airport_code, city)" +
                "VALUES" +
                "('JFK', 'New York')," +
                "('LAX', 'Los Angeles')," +
                "('ORD', 'Chicago')," +
                "('AES', 'Ålesund')," +
                "('AMS', 'Amsterdam')," +
                "('ZRH', 'Zurich')," +
                "('LHR', 'London Heathrow')," +
                "('FCO', 'Rome')," +
                "('CDG', 'Paris')," +
                "('DFW', 'Dallas')," +
                "('FRA', 'Frankfurt')," +
                "('HND', 'Tokyo')," +
                "('DXB', 'Dubai')," +
                "('DOH', 'Doha')," +
                "('SYD', 'Sydney')," +
                "('SIN', 'Singapore')";
             // Execute the SQL
             jdbcTemplate.execute(sql);
             logger.info("Airports loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load airports.", e);
        }
    }

    public void loadRoutes() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.route (arrival_airport_code, departure_airport_code)\r\n" + //
                                "VALUES\r\n" + //
                                "    (1, 2),   -- JFK (New York) to LAX (Los Angeles)\r\n" + 
                                "    (3, 4),   -- ORD (Chicago) to AES (Ålesund)\r\n" + 
                                "    (5, 7),   -- AMS (Amsterdam) to LHR (London Heathrow)\r\n" + 
                                "    (8, 9),   -- FCO (Rome) to CDG (Paris)\r\n" + 
                                "    (10, 11), -- DFW (Dallas) to FRA (Frankfurt)\r\n" + 
                                "    (12, 13), -- HND (Tokyo) to DXB (Dubai)\r\n" + 
                                "    (14, 15), -- DOH (Doha) to SYD (Sydney)\r\n" + 
                                "    (16, 1),  -- SIN (Singapore) to JFK (New York)\r\n" + 
                                "    (5, 6),   -- AMS (Amsterdam) to ZRH (Zurich)\r\n" + 
                                "    (9, 10);  -- CDG (Paris) to DFW (Dallas)";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Routes loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load routes.", e);
        }
    }

    public void loadPrices() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.price (discount, price, price_code, provider, class_id, scheduled_flights_id)\r\n" + 
                                "VALUES\r\n" + 
                                "    (0, 500, 'USD', 'Skyscanner', 1, 21),  -- Flight 18, Route 1 (JFK to LAX)\r\n" + 
                                "    (10, 400, 'NOK', 'CheapOair', 2, 22),  -- Flight 19, Route 2 (ORD to AES)\r\n" + 
                                "    (0, 550, 'EUR', 'Orbitz', 8, 23),  -- Flight 20, Route 3 (AMS to LHR)\r\n" + 
                                "    (5, 600, 'CHF', 'OneTravel', 7, 24),  -- Flight 21, Route 4 (FCO to CDG)\r\n" + 
                                "    (0, 450, 'EUR', 'Travelocity', 1, 25),  -- Flight 22, Route 5 (DFW to FRA)\r\n" + 
                                "    (15, 700, 'USD', 'Google Flights', 8, 26),  -- Flight 23, Route 6 (HND to DXB)\r\n" + 
                                "    (0, 650, 'EUR', 'JustFly', 2, 27),  -- Flight 24, Route 7 (DOH to SYD)\r\n" + 
                                "    (10, 800, 'USD', 'eDreams', 7, 28),  -- Flight 25, Route 8 (SIN to JFK)\r\n" + 
                                "    (5, 550, 'AED', 'Priceline', 4, 29),  -- Flight 26, Route 9 (AMS to ZRH)\r\n" + 
                                "    (0, 450, 'QAR', 'American Airlines Website', 1, 30);  -- Flight 27, Route 10 (CDG to DFW)";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Prices loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load prices.", e);
        }
    }

    public void loadExtraFeatures() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.extra_feature\r\n" + 
                                "(name) VALUES\r\n" + 
                                "\t('Complimentary Wi-Fi'),\r\n" + 
                                "    ('Seat-back Screens'),\r\n" + 
                                "    ('Free Snacks'),\r\n" + 
                                "    ('Free Breakfast'),\r\n" + 
                                "    ('Seat Reservation'),\r\n" + 
                                "    ('Fast Track'),\r\n" + 
                                "    ('In-flight Magazine'),\r\n" + 
                                "    ('Extra Legroom'),\r\n" + 
                                "    ('Complimentary Meals'),\r\n" + 
                                "    ('Lounge Access'),\r\n" + 
                                "    ('Enhanced Entertainment System'),\r\n" + 
                                "    ('Priority Boarding'),\r\n" + 
                                "    ('Lounge Access'),\r\n" + 
                                "    ('Swiss Chocolates'),\r\n" + 
                                "    ('Priority Check-in'),\r\n" + 
                                "    ('Complimentary Drinks'),\r\n" + 
                                "    ('Italian Cuisine'),\r\n" + 
                                "    ('Reserved Overhead Space'),\r\n" + 
                                "    ('Alitalia Lounges'),\r\n" + 
                                "    ('Wi-Fi'),\r\n" + 
                                "    ('On-demand Video'),\r\n" + 
                                "    ('Lounges Access'),\r\n" + 
                                "    ('Michelin-starred Menus'),\r\n" + 
                                "    ('Personal Coat Service'),\r\n" + 
                                "    ('Flat-bed Seats'),\r\n" + 
                                "    ('Shower Spas'),\r\n" + 
                                "    ('Award-winning Cuisine'),\r\n" + 
                                "    ('Fully Lie-flat Beds'),\r\n" + 
                                "    ('4000 Entertainment Options'),\r\n" + 
                                "    ('Book the Cook Service'),\r\n" + 
                                "    ('Givenchy Amenities'),\r\n" + 
                                "    ('Standalone Beds');";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Extra features loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load extra features.", e);
        }
    }

    public void loadFlightAccommodations() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.flight_accommodation (feature_id, flight_id) \r\n" + 
                                "VALUES\r\n" + 
                                "    (1, 18), (2, 18), (3, 18),   -- Delta Flight 425\r\n" + 
                                "    (4, 19), (5, 19), (6, 19),   -- Norwegian Flight 708\r\n" + 
                                "    (7, 20), (8, 20), (9, 20),   -- KLM Flight 605\r\n" + 
                                "    (10, 21), (11, 21), (12, 21), -- Swiss Flight 110\r\n" + 
                                "    (13, 22), (14, 22), (15, 22), -- Alitalia Flight 560\r\n" + 
                                "    (16, 23), (17, 23), (18, 23), -- AA Flight 220\r\n" + 
                                "    (19, 24), (20, 24), (21, 24), -- Lufthansa Flight 445\r\n" + 
                                "    (22, 25), (23, 25), (24, 25), -- Air France Flight 123\r\n" + 
                                "    (25, 26), (26, 26), (27, 26), -- Emirates Flight 204\r\n" + 
                                "    (28, 27), (29, 27), (30, 27), -- Qatar Airways Flight 905\r\n" + 
                                "    (31, 28), (32, 28), (1, 28);  -- Singapore Airlines Flight 26\r\n" + 
                                "";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Flight accommodations loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load flight accommodations.", e);
        }
    }

    public void loadRoute() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.route (arrival_airport_code, departure_airport_code)\r\n" + 
                                "VALUES\r\n" + 
                                "    (1, 2),   -- JFK (New York) to LAX (Los Angeles)\r\n" + 
                                "    (3, 4),   -- ORD (Chicago) to AES (Ålesund)\r\n" + 
                                "    (5, 7),   -- AMS (Amsterdam) to LHR (London Heathrow)\r\n" + 
                                "    (8, 9),   -- FCO (Rome) to CDG (Paris)\r\n" + 
                                "    (10, 11), -- DFW (Dallas) to FRA (Frankfurt)\r\n" + 
                                "    (12, 13), -- HND (Tokyo) to DXB (Dubai)\r\n" + 
                                "    (14, 15), -- DOH (Doha) to SYD (Sydney)\r\n" + 
                                "    (16, 1),  -- SIN (Singapore) to JFK (New York)\r\n" + 
                                "    (5, 6),   -- AMS (Amsterdam) to ZRH (Zurich)\r\n" + 
                                "    (9, 10);  -- CDG (Paris) to DFW (Dallas)\r\n" + 
                                "";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Routes loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load routes.", e);
        }
    }

    public void loadScheduled_flights() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.scheduled_flights (`date`, flight_id, route_id)\r\n" + 
                                "VALUES\r\n" + 
                                "    ('2025-04-01', 18, 1),  -- Delta Flight 425, JFK to LAX\r\n" + 
                                "    ('2025-04-02', 19, 2),  -- Norwegian Flight 708, ORD to AES\r\n" + 
                                "    ('2025-04-03', 20, 3),  -- KLM Flight 605, AMS to LHR\r\n" + 
                                "    ('2025-04-04', 21, 4),  -- Swiss Flight 110, FCO to CDG\r\n" + 
                                "    ('2025-04-05', 22, 5),  -- Alitalia Flight 560, DFW to FRA\r\n" + 
                                "    ('2025-04-06', 23, 6),  -- AA Flight 220, HND to DXB\r\n" + 
                                "    ('2025-04-07', 24, 7),  -- Lufthansa Flight 445, DOH to SYD\r\n" + 
                                "    ('2025-04-08', 25, 8),  -- Air France Flight 123, SIN to JFK\r\n" + 
                                "    ('2025-04-09', 26, 9),  -- Emirates Flight 204, AMS to ZRH\r\n" + 
                                "    ('2025-04-10', 27, 10); -- Qatar Airways Flight 905, CDG to DFW\r\n" + 
                                "";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Scheduled flights loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load scheduled flights.", e);
        }
    }

    public void loadFlight() {
        try {
            // Read the SQL file as a string
            String sql = "INSERT INTO testconnection.flight (company, name)\r\n" + 
                                "\tVALUES\r\n" + 
                                "\t\t('Delta Air Lines', 'Delta Flight 425'),\r\n" + 
                                "        ('Norwegian Air Shuttle', 'Norwegian Flight 708'),\r\n" + 
                                "        ('KLM Royal Dutch Airlines', 'KLM Flight 605'),\r\n" + 
                                "        ('Swiss International Air Lines', 'Swiss Flight 110'),\r\n" + 
                                "        ('Alitalia', 'Alitalia Flight 560'),\r\n" + 
                                "        ('American Airlines', 'AA Flight 220'),\r\n" + 
                                "        ('Lufthansa', 'LH Flight 445'),\r\n" + 
                                "        ('Air France', 'AF Flight 123'),\r\n" + 
                                "        ('Emirates', 'EK Flight 204'),\r\n" + 
                                "        ('Qatar Airways', 'QR Flight 905'),\r\n" + 
                                "        ('Singapore Airlines', 'SQ Flight 26');";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Flight class loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load flight class.", e);
        }
    }

    public void createTables() {
        try {
            // Read the SQL file as a string
            String sql = "CREATE TABLE IF NOT EXISTS airport(\r\n" + 
                                "    airport_code CHAR(3) PRIMARY KEY,\r\n" + 
                                "    city VARCHAR(255) NOT NULL\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS class(\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    name Varchar(50) NOT NULL UNIQUE\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS flight(\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    name Varchar(100) NOT NULL,\r\n" + 
                                "    company Varchar(255) NOT NULL\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS extra_feature (\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    name Varchar(50) NOT NULL UNIQUE\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS user(\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    username VARCHAR(255) NOT NULL,\r\n" + 
                                "    password VARCHAR(255) NOT NULL,\r\n" + 
                                "    email VARCHAR(255) NOT NULL\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS route(\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    departure_airport_code CHAR(3) NOT NULL,\r\n" + 
                                "    arrival_airport_code CHAR(3) NOT NULL,\r\n" + 
                                "    FOREIGN KEY (departure_airport_code) REFERENCES airport(airport_code),\r\n" + 
                                "    FOREIGN KEY (arrival_airport_code) REFERENCES airport(airport_code)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS scheduled_flights(\r\n" + 
                                "    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    route_id INT NOT NULL,\r\n" + 
                                "    date DATE NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id),\r\n" + 
                                "    FOREIGN KEY (route_id) REFERENCES route(id)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "Create Table IF NOT EXISTS favorite_flights ( \r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    user_id INT NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (user_id) REFERENCES user(id),\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS flight_accommodations (\r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    feature_id INT NOT NULL,\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id),\r\n" + 
                                "    FOREIGN KEY (feature_id) REFERENCES extra_feature(id)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS flight_classes(\r\n" + 
                                "    class_id INT NOT NULL,\r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    available_seats INT UNSIGNED NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (class_id) REFERENCES class(id),\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS price(\r\n" + 
                                "    id INT PRIMARY KEY AUTO_INCREMENT,\r\n" + 
                                "    class_id INT NOT NULL,\r\n" + 
                                "    price INT UNSIGNED NOT NULL,\r\n" + 
                                "    price_code CHAR(3) NOT NULL,\r\n" + 
                                "    provider VARCHAR(64),\r\n" + 
                                "    discount INT UNSIGNED DEFAULT 0,\r\n" + 
                                "    scheduled_flights_id INT NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (class_id) REFERENCES class(id),\r\n" + 
                                "    FOREIGN KEY (scheduled_flights_id) REFERENCES scheduled_flights(id),\r\n" + 
                                "    CONSTRAINT CHK_Price_Discount_Range CHECK (discount BETWEEN 0 AND 100)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "Create Table IF NOT EXISTS purchases (\r\n" + 
                                "    user_id INT NOT NULL,\r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    price_id INT NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (user_id) REFERENCES user(id),\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id),\r\n" + 
                                "    FOREIGN KEY (price_id) REFERENCES price(id)\r\n" + 
                                ");\r\n" + 
                                "";
        // Execute the SQL
        String[] statements = sql.split(";");
        for (String statement : statements) {
            if (!statement.trim().isEmpty()) {
                logger.info("Executing table creation SQL...");
                jdbcTemplate.execute(statement);
                }
}
            logger.info("Tables created successfully.");
        } catch (Exception e) {
            logger.error("Failed to create tables.", e);
        }
    }

}