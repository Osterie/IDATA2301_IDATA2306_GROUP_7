package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.ClassEntity;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.ClassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class FlightClassesInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightClassesInitializer.class);

    private final FlightClassesRepository flightClassesRepository;
    private final ClassRepository classRepository;

    @Autowired
    public FlightClassesInitializer(FlightClassesRepository flightClassesRepository, ClassRepository classRepository) {
        this.flightClassesRepository = flightClassesRepository;
        this.classRepository = classRepository;
    }

    public void generateFlightClassesForFlight(Flight flight) {
        try {
            // Fetch all available classes from the database
            ClassEntity classEntity = classRepository.getRandomClass();
            if (classEntity == null) {
                logger.error("Cannot generate flight classes: No classes available.");
                return;
            }

            // Generate a random number of available seats
            int availableSeats = ThreadLocalRandom.current().nextInt(0, 100); // Random seats between 10 and 100

            // Create and save the flight class
            FlightClasses flightClasses = new FlightClasses(classEntity, flight, availableSeats);
            flightClassesRepository.save(flightClasses);
    
        } catch (Exception e) {
            logger.error("Error generating flight classes for flight: " + flight.getName(), e);
        }
    }
}