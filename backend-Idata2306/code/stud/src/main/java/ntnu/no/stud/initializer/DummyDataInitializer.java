package ntnu.no.stud.initializer;

import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;


import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.ClassRepository;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.UserRepository;





@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final Logger logger = LoggerFactory.getLogger(DummyDataInitializer.class);

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired 
    private FlightClassesRepository flightClassesRepository;

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
    private UserRepository userRepository;

    @Autowired
    private AccessUserService userService;

    @Autowired
    private FlightInitializer flightInitializer;

    @Autowired
    private RouteInitializer routeInitializer;



    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        
        Optional<User> existingAdminUser = userRepository.findByUsername("chuck");
        Optional<User> existingDefaultUser = userRepository.findByUsername("dave");

        if (existingAdminUser.isEmpty() && existingDefaultUser.isEmpty()) {
          logger.info("Importing test data...");
  
          try {
           // Create admin user
            userService.tryCreateNewUser("chuck", "Nunchucks2024", "chuck@gmail.com");
            User admin = userRepository.findByUsername("chuck").orElseThrow();
  
            UserRole adminRole = new UserRole(admin, "ADMIN");
            admin.addRole(adminRole);
            userRepository.save(admin); // Will cascade to roles if CascadeType.ALL is set
  
            // Create default user
            userService.tryCreateNewUser("dave", "Dangerous2024", "dave@gmail.com");
            User defaultUser = userRepository.findByUsername("dave").orElseThrow();
  
            // UserRole userRole = new UserRole(defaultUser, "USER");
            // defaultUser.addRole(userRole);
            userRepository.save(defaultUser);
  
            logger.info("DONE importing test data");
  
          } catch (IOException e) {
            logger.error("Failed to import test data: {}", e.getMessage());
          }
        } else {
          logger.info("Users already in the database, not importing anything");
        }


        // Step 1: Load data from SQL files if necessary
    
        try {   
        //createDatabase();     
        // createTables();
        if (airportRepository.count() == 0) {
            loadAirports();
        }
        if (classRepository.count() == 0) {
            loadClass();
        }
        if (flightRepository.count() == 0) {
            loadFlight();
        }
        if (flightClassesRepository.count() == 0) {
            loadFlightClasses();
        }
        if (routeRepository.count() == 0) {
            loadRoutes();
        }
        if (scheduledFlightsRepository.count() == 0) {
            loadScheduledFlights();
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
        } catch (Exception e) {
            logger.error("Failed to load data from SQL files.", e);
        }



        // Step 2: Use initializers to generate random data
        try {

            int numberOfRoutes = 10; // Number of routes to generate
            int numberOfFlights = 100; // Number of flights to generate
            int numberOfTestFlights = 10; // Number of test flights to generate
            Route testRoute = routeRepository.findById(9);

            if (airportRepository.count() > 0 && routeRepository.count() > 0) {
                routeInitializer.generateRandomRoutes(numberOfRoutes); // Generate random routes
            }
            if (routeRepository.count() > 0 && flightRepository.count() > 0) {
                flightInitializer.generateRandomFlights(numberOfFlights); // Generate random flights
            }


            flightInitializer.generateRandomFlights(numberOfTestFlights, testRoute);
        } catch (Exception e) {
            logger.error("Failed to generate random data.", e);
        }
    }







    public void loadScheduledFlights() {
        try {
            // Get all flight IDs and route IDs
            String fetchFlightsSql = "SELECT id FROM flight_application.flights";
            String fetchRoutesSql = "SELECT id FROM flight_application.routes";
    
            List<Integer> flightIds = jdbcTemplate.queryForList(fetchFlightsSql, Integer.class);
            List<Integer> routeIds = jdbcTemplate.queryForList(fetchRoutesSql, Integer.class);
    
            if (routeIds.isEmpty()) {
                logger.warn("No routes found. Cannot schedule flights.");
                return;
            }
    
            Random random = new Random();
            StringBuilder insertSql = new StringBuilder("INSERT INTO flight_application.scheduled_flights (`date`, flight_id, route_id) VALUES ");
    
            List<String> valueRows = new ArrayList<>();
    
            LocalDate startDate = LocalDate.of(2025, 4, 1);
    
            for (int i = 0; i < flightIds.size(); i++) {
                int flightId = flightIds.get(i);
                int routeId = routeIds.get(random.nextInt(routeIds.size()));
    
                // Spread dates evenly from startDate
                LocalDate flightDate = startDate.plusDays(i);
    
                valueRows.add(String.format("('%s', %d, %d)", flightDate, flightId, routeId));
            }
    
            insertSql.append(String.join(", ", valueRows)).append(";");
    
            jdbcTemplate.execute(insertSql.toString());
            logger.info("Scheduled flights loaded successfully.");
    
        } catch (DataAccessException e) {
            logger.error("Database error while loading scheduled flights.", e);
        } catch (Exception e) {
            logger.error("Unexpected error while loading scheduled flights.", e);
        }
    }
    

    public void loadAirports() {
        try {
            // SQL to insert airport data
            String sql = "INSERT INTO flight_application.airport (airport_code, city)" +
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
        } catch (DataAccessException e) {
           logger.error("Database error occurred while loading airports.", e);
       } catch (Exception e) {
           logger.error("Unexpected error occurred while loading airports.", e);
       }
    }

public void loadRoutes() {
    try {
        // Fetch all airport IDs
        String fetchAirportsSql = "SELECT id FROM flight_application.airport";
        List<Integer> airportIds = jdbcTemplate.queryForList(fetchAirportsSql, Integer.class);

        if (airportIds.size() < 2) {
            logger.warn("Not enough airports to create routes.");
            return;
        }

        Random random = new Random();
        StringBuilder insertSql = new StringBuilder("INSERT INTO flight_application.route (arrival_airport_code, departure_airport_code) VALUES ");
        List<String> valueRows = new ArrayList<>();

        int numberOfRoutes = 10;
        Set<String> usedPairs = new HashSet<>();

        while (valueRows.size() < numberOfRoutes) {
            int dep = airportIds.get(random.nextInt(airportIds.size()));
            int arr = airportIds.get(random.nextInt(airportIds.size()));

            if (dep != arr) {
                String key = dep + "-" + arr;
                if (!usedPairs.contains(key)) {
                    usedPairs.add(key);
                    valueRows.add(String.format("(%d, %d)", arr, dep)); // Note: arrival first, as in your original SQL
                }
            }
        }

        insertSql.append(String.join(", ", valueRows)).append(";");

        jdbcTemplate.execute(insertSql.toString());
        logger.info("Routes loaded successfully.");

    } catch (DataAccessException e) {
        logger.error("Database error occurred while loading routes.", e);
    } catch (Exception e) {
        logger.error("Unexpected error occurred while loading routes.", e);
    }
}


    public void loadPrices() {
        try {
            // Fetch all scheduled flight IDs
            String fetchScheduledFlightsSql = "SELECT id FROM flight_application.scheduled_flights";
            List<Integer> scheduledFlightIds = jdbcTemplate.queryForList(fetchScheduledFlightsSql, Integer.class);
    
            // Static lists of currencies and providers
            List<String> currencies = Arrays.asList("USD", "EUR", "NOK", "CHF", "AED", "QAR");
            List<String> providers = Arrays.asList("Skyscanner", "CheapOair", "Orbitz", "OneTravel", "Travelocity",
                                                   "Google Flights", "JustFly", "eDreams", "Priceline", "AA Website");
    
            Random random = new Random();
            StringBuilder insertSql = new StringBuilder("INSERT INTO flight_application.price (price, currency_code, provider, discount, class_id, scheduled_flights_id) VALUES ");
    
            List<String> valueRows = new ArrayList<>();
    
            for (Integer scheduledFlightId : scheduledFlightIds) {
                int price = (random.nextInt((900 - 300) / 10 + 1) * 10) + 300;
                String currency = currencies.get(random.nextInt(currencies.size()));
                String provider = providers.get(random.nextInt(providers.size()));
                int discount = random.nextInt(5 + 1) * 5;
                int classId = 1 + random.nextInt(10);
    
                // Escape single quotes in provider names (just in case)
                provider = provider.replace("'", "''");
    
                valueRows.add(String.format("(%d, '%s', '%s', %d, %d, %d)", price, currency, provider, discount, classId, scheduledFlightId));
            }
    
            insertSql.append(String.join(", ", valueRows)).append(";");
    
            jdbcTemplate.execute(insertSql.toString());
            logger.info("Random prices loaded successfully for all scheduled flights.");
    
        } catch (DataAccessException e) {
            logger.error("Database error occurred while loading prices.", e);
        } catch (Exception e) {
            logger.error("Unexpected error occurred while loading prices.", e);
        }
    }
    

    public void loadExtraFeatures() {
        try {
            // SQL to insert extra feature data
            String sql = "INSERT INTO flight_application.extra_feature\r\n" + 
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
        } catch (DataAccessException e) {
           logger.error("Database error occurred while loading extra features.", e);
       } catch (Exception e) {
           logger.error("Unexpected error occurred while loading extra features.", e);
       }
    }

public void loadFlightAccommodations() {
    try {
        // Get all flight IDs from the flights table
        String fetchFlightsSql = "SELECT id FROM flight_application.flights";
        List<Integer> flightIds = jdbcTemplate.queryForList(fetchFlightsSql, Integer.class);

        // Define the range of available feature IDs (1–32 for example)
        List<Integer> featureIds = IntStream.rangeClosed(1, 32).boxed().collect(Collectors.toList());

        StringBuilder insertSql = new StringBuilder(
            "INSERT INTO flight_application.flight_accommodation (feature_id, flight_id) VALUES ");

        List<String> valueRows = new ArrayList<>();

        for (Integer flightId : flightIds) {
            // Shuffle and take 3 unique feature IDs
            Collections.shuffle(featureIds);
            List<Integer> selectedFeatures = featureIds.subList(0, 3);

            for (Integer featureId : selectedFeatures) {
                valueRows.add(String.format("(%d, %d)", featureId, flightId));
            }
        }

        insertSql.append(String.join(", ", valueRows)).append(";");

        jdbcTemplate.execute(insertSql.toString());
        logger.info("Random flight accommodations loaded for all flights.");

    } catch (DataAccessException e) {
        logger.error("Database error occurred while loading flight accommodations.", e);
    } catch (Exception e) {
        logger.error("Unexpected error occurred while loading flight accommodations.", e);
    }
}



    public void loadFlight() {
        try {
            // SQL to insert flight data
            String sql = "INSERT INTO flight_application.flight (company, name)\r\n" + 
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
        } catch (DataAccessException e) {
           logger.error("Database error occurred while loading flights.", e);
       } catch (Exception e) {
           logger.error("Unexpected error occurred while loading flights.", e);
       }
    }

    public void loadFlightClasses() {
    try {
        // Get all flight IDs from your flights table
        String fetchFlightsSql = "SELECT id FROM flight_application.flight";
        List<Integer> flightIds = jdbcTemplate.queryForList(fetchFlightsSql, Integer.class);

        // We'll use a set of available class IDs to randomly assign
        List<Integer> availableClassIds = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        Random random = new Random();

        // Build SQL insert
        StringBuilder insertSql = new StringBuilder("INSERT INTO flight_application.flight_classes (available_seats, flight_id, class_id) VALUES ");

        List<String> valueRows = new ArrayList<>();

        for (Integer flightId : flightIds) {
            // Pick 3 unique random class IDs
            Collections.shuffle(availableClassIds);
            List<Integer> classIds = availableClassIds.subList(0, 3);

            for (Integer classId : classIds) {
                int seats = random.nextInt(81) + 20; // 20 to 100
                valueRows.add(String.format("(%d, %d, %d)", seats, flightId, classId));
            }
        }

        // Join the value rows into the final SQL
        insertSql.append(String.join(", ", valueRows)).append(";");

        jdbcTemplate.execute(insertSql.toString());
        logger.info("Random flight classes loaded for all flights.");

    } catch (DataAccessException e) {
        logger.error("Database error occurred while loading flight classes.", e);
    } catch (Exception e) {
        logger.error("Unexpected error occurred while loading flight classes.", e);
    }
}



    public void createTables() {
        try {
            // SQL to create tables
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
                                "\r\n ALTER TABLE flight AUTO_INCREMENT = 18; \r\n" +
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
                                "\r\n ALTER TABLE scheduled_flights AUTO_INCREMENT = 21; \r\n" +
                                "\r\n" + 
                                "Create Table IF NOT EXISTS favorite_flights ( \r\n" + 
                                "    flight_id INT NOT NULL,\r\n" + 
                                "    user_id INT NOT NULL,\r\n" + 
                                "\r\n" + 
                                "    FOREIGN KEY (user_id) REFERENCES user(id),\r\n" + 
                                "    FOREIGN KEY (flight_id) REFERENCES flight(id)\r\n" + 
                                ");\r\n" + 
                                "\r\n" + 
                                "CREATE TABLE IF NOT EXISTS flight_accommodation (\r\n" + 
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
                                "    price INT UNSIGNED NOT NULL,\r\n" + 
                                "    currency_code CHAR(3) NOT NULL,\r\n" + 
                                "    provider VARCHAR(64),\r\n" + 
                                "    discount INT UNSIGNED DEFAULT 0,\r\n" + 
                                "    class_id INT NOT NULL,\r\n" + 
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

    public void loadClass() {
        try {
            // SQL to insert class data
            String sql = "INSERT INTO flight_application.class (name)\r\n" +
                         "VALUES\r\n" +
                         "    ('Economy'),\r\n" +
                         "    ('Economy Flex'),\r\n" +
                         "    ('Business'),\r\n" +
                         "    ('Premium Economy'),\r\n" +
                         "    ('Main Cabin'),\r\n" +
                         "    ('Main Cabin Extra'),\r\n" +
                         "    ('La Première'),\r\n" +
                         "    ('First Class'),\r\n" +
                         "    ('Qsuite'),\r\n" +
                         "    ('Business Class'),\r\n" +
                         "    ('Suites');";
    
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Classes loaded successfully.");
        } catch (DataAccessException e) {
            logger.error("Database error occurred while loading classes.", e);
        } catch (Exception e) {
            logger.error("Unexpected error occurred while loading classes.", e);
        }
    }

    public void updateScheduledFlights() {
        try {
            // Query to get the latest scheduled flight date
            String sql = "SELECT MAX(date) FROM flight_application.scheduled_flights";
            LocalDate latestDate = jdbcTemplate.queryForObject(sql, LocalDate.class);
    
            // Determine the starting date for generating new scheduled flights
            LocalDate startDate = (latestDate != null && latestDate.isAfter(LocalDate.now()))
                    ? latestDate.plusDays(1) // Start from the day after the latest date
                    : LocalDate.now();       // Start from today if no flights exist or latest date is in the past
    
            // Calculate the end date (365 days from today)
            LocalDate endDate = LocalDate.now().plusDays(365);
    
            // Generate new scheduled flights for each day from startDate to endDate
            while (!startDate.isAfter(endDate)) {
                flightInitializer.generateRandomFlights(15, startDate);
                startDate = startDate.plusDays(1); // Move to the next day
            }
    
            logger.info("Scheduled flights updated successfully.");
        } catch (Exception e) {
            logger.error("Failed to update scheduled flights.", e);
        }
    }
}