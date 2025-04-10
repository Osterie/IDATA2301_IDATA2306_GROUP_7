package ntnu.no.stud.initializer;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
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
public class DummyDataInitializer implements CommandLineRunner {

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
    public void run(String... args) {
        // Step 1: Load data from SQL files if necessary
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/scheduled_flights.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/airports.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/routes.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/prices.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/extra_features.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/flight_accommodations.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/routes.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/scheduled_flights.sql")));
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
            String sql = new String(Files.readAllBytes(Paths.get("IDATA2301_IDATA2306_GROUP_7/backend-Idata2306/Resources/Database/Insertion/flight_class.sql")));
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Flight class loaded successfully.");
        } catch (Exception e) {
            logger.error("Failed to load flight class.", e);
        }
    }
}