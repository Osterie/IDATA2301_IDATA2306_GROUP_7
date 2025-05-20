package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightCompany;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.repositories.FlightCompanyRepository;
import ntnu.no.stud.repositories.FlightRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class FlightInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightInitializer.class);

    @Autowired
    private ScheduledFlightsInitializer scheduledFlightsInitializer;

    @Autowired
    private FlightClassesInitializer flightClassInitializer;

    @Autowired
    private FlightAccommodationInitializer flightAccommodationInitializer;

    @Autowired
    private final FlightRepository flightRepository;

    @Autowired
    private FlightCompanyRepository flightCompanyRepository;

    @Autowired
    public FlightInitializer(FlightRepository flightRepository, FlightCompanyRepository flightCompanyRepository) {
        this.flightRepository = flightRepository;
        this.flightCompanyRepository = flightCompanyRepository;
    }

    public void generateRandomFlights(int numberOfFlights) {
        generateRandomFlights(numberOfFlights, null, null);
    }

    public void generateRandomFlights(int numberOfFlights, Route route) {
        generateRandomFlights(numberOfFlights, null, route);
    }

    public void generateRandomFlights(int numberOfFlights, LocalDate date) {
        generateRandomFlights(numberOfFlights, date, null);
    }

public void generateRandomFlights(int numberOfFlights, LocalDate date, Route route) {
    try {
        // Creates and saves all flights
        for (int i = 0; i < numberOfFlights; i++) {
            int airlineId = flightCompanyRepository.getRandomCompanyId();
            String airlinePrefix = flightCompanyRepository.findAbriviationById(airlineId);

            Flight flight = createAndSaveFlight(airlineId, airlinePrefix);

            // Adds accommodations and flight classes
            for (int j = 0; j < 3; j++) {
                flightAccommodationInitializer.addRandomAccommodationToFlight(flight);
                flightClassInitializer.generateFlightClassesForFlight(flight);
            }
        }

        // Generate scheduled flights for all created flights
        scheduledFlightsInitializer.generateScheduledFlights();

        logger.info(numberOfFlights + " random flights generated successfully.");

        } catch (Exception e) {
            logger.error("Error generating flight: " + e.getMessage());
        }
    }

    private Flight createAndSaveFlight(int airlineId, String airlinePrefix) {
        // Generate a random flight number
        int flightNumber = ThreadLocalRandom.current().nextInt(100, 999);

        // Combine the prefix and flight number
        String flightName = airlinePrefix + flightNumber;

        // finds the airline company by id
        FlightCompany flightCompany = flightCompanyRepository.findById(airlineId);

        // Create and save the flight
        Flight flight = new Flight(flightName, flightCompany);
        flightRepository.save(flight);

        return flight;
    }
}
