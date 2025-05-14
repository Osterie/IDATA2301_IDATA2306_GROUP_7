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
import java.util.Map;

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
import ntnu.no.stud.repositories.FlightCompanyRepository;
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
    private FlightCompanyRepository flightCompanyRepository;

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
    private FlightCompanyInitializer flightCompanyInitializer;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccessUserService userService;

    @Autowired
    private FlightInitializer flightInitializer;

    @Autowired
    private RouteInitializer routeInitializer;

    @Autowired
    ExtraFeatureInitializer extraFeatureInitializer;

    @Autowired
    AirportInitializer airportInitializer;

    @Autowired
    ClassInitializer classInitializer;

    



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
    
        try {   
        if (airportRepository.count() == 0) {
            airportInitializer.loadAirports();
        }
        if (extraFeatureRepository.count() == 0) {
            extraFeatureInitializer.loadExtraFeatures();
        }
        if (flightCompanyRepository.count() == 0) {
            flightCompanyInitializer.flightCompanyInitializer();
        }
        if (classRepository.count() == 0) {
            classInitializer.loadClasses();
        }
        if (routeRepository.count() == 0) {
            routeInitializer.generateRoutes();
        }
        if (flightRepository.count() == 0) {
            int numberOfFlights = 1000; 
            flightInitializer.generateRandomFlights(numberOfFlights);
        }
        } catch (Exception e) {
            logger.error("Failed to load data from SQL files.", e);
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
                                "Create Table IF NOT EXISTS purchase (\r\n" + 
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