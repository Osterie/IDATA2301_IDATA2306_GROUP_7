package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.ClassEntity;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.ClassRepository;
import ntnu.no.stud.repositories.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class FlightClassesInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightClassesInitializer.class);

    @Autowired
    private FlightRepository flightRepository;

    private final FlightClassesRepository flightClassesRepository;
    private final ClassRepository classRepository;

    public FlightClassesInitializer(FlightClassesRepository flightClassesRepository, ClassRepository classRepository) {
        this.flightClassesRepository = flightClassesRepository;
        this.classRepository = classRepository;
    }

    public void generateFlightClassesForFlight() {
        Iterable<Flight> allFlights = flightRepository.findAll();
        Iterable<ClassEntity> allClasses = classRepository.findAll();
        for (Flight flight : allFlights) {
            for (ClassEntity classEntity : allClasses) {
                try {   
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
        logger.info("Flight classes generated successfully.");
    }
}