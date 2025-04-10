package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.repositories.RouteRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class FlightInitializer {

        private static final Logger logger = LoggerFactory.getLogger(FlightInitializer.class);


    private final FlightRepository flightRepository;

    @Autowired
    public FlightInitializer(FlightRepository flightRepository, RouteRepository routeRepository) {
        this.flightRepository = flightRepository;
    }

    public void generateRandomFlights(int numberOfFlights) {
        for (int i = 0; i < numberOfFlights; i++) {
            // Generate random flight number
            String flightNumber = "FL" + ThreadLocalRandom.current().nextInt(1000, 9999);

            // Randomly select an airline
            String[] airlines = {"American Airlines", "Delta Airlines", "United Airlines", "Lufthansa", "Emirates"};
            String airline = airlines[ThreadLocalRandom.current().nextInt(airlines.length)];


            // Create and save the flight
            Flight flight = new Flight(flightNumber, airline);
            flightRepository.save(flight);
        }

        logger.info(numberOfFlights + " random flights generated successfully.");
    }
}