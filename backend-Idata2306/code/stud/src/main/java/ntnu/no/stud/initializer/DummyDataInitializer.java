package ntnu.no.stud.initializer;

import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.jdbc.core.JdbcTemplate;

import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.ClassRepository;
import ntnu.no.stud.repositories.FlightCompanyRepository;
import ntnu.no.stud.repositories.UserRepository;

@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private static final Logger logger = LoggerFactory.getLogger(DummyDataInitializer.class);

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private FlightCompanyRepository flightCompanyRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private AirportRepository airportRepository;

    @Autowired
    private ExtraFeatureRepository extraFeatureRepository;

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
    private ExtraFeatureInitializer extraFeatureInitializer;

    @Autowired
    private AirportInitializer airportInitializer;

    @Autowired
    private ClassInitializer classInitializer;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {

        this.createDummyUsers();

        try {
            if (airportRepository.count() == 0) {
                airportInitializer.loadAirports();
                logger.info("Airports loaded successfully.");
            }
            if (extraFeatureRepository.count() == 0) {
                extraFeatureInitializer.loadExtraFeatures();
                logger.info("Extra features loaded successfully.");
            }
            if (flightCompanyRepository.count() == 0) {
                flightCompanyInitializer.flightCompanyInitializer();
                logger.info("Flight companies loaded successfully.");
            }
            if (classRepository.count() == 0) {
                classInitializer.loadClasses();
                logger.info("Classes loaded successfully.");
            }
            if (routeRepository.count() == 0) {
                routeInitializer.generateRoutes();
                logger.info("Routes loaded successfully.");
            }
            if (flightRepository.count() == 0) {
                int numberOfFlights = 1000;
                flightInitializer.generateRandomFlights(numberOfFlights);
                logger.info("Random prices generated successfully.");
            }
        } catch (Exception e) {
            logger.error("Failed to load data from SQL files.", e);
        }
    }

    public void createDummyUsers() {

        String adminUserName = "chuck";
        String defaultUserName = "dave";

        Optional<User> existingAdminUser = userRepository.findByUsername(adminUserName);
        Optional<User> existingDefaultUser = userRepository.findByUsername(defaultUserName);

        if (existingAdminUser.isEmpty() && existingDefaultUser.isEmpty()) {
            logger.info("Importing test data...");

            try {
                // Create admin user
                userService.tryCreateNewUser(adminUserName, "Nunchucks2024", "chuck@gmail.com");
                User admin = userRepository.findByUsername(adminUserName).orElseThrow();

                UserRole adminRole = new UserRole(admin, "ADMIN");
                admin.addRole(adminRole);
                userRepository.save(admin); // Will cascade to roles if CascadeType.ALL is set

                // Create default user
                userService.tryCreateNewUser(defaultUserName, "Dangerous2024", "dave@gmail.com");
                User defaultUser = userRepository.findByUsername(defaultUserName).orElseThrow();

                userRepository.save(defaultUser);

                logger.info("DONE importing test data");

            } catch (IOException e) {
                logger.error("Failed to import test data: {}", e.getMessage());
            }
        } else {
            logger.info("Users already in the database, not importing anything");
        }
    }
}