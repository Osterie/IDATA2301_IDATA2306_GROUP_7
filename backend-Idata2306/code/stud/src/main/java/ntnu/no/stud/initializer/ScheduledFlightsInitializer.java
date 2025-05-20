package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;
import ntnu.no.stud.repositories.FlightRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.time.LocalDate;
import java.util.concurrent.ThreadLocalRandom;


@Component
public class ScheduledFlightsInitializer {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledFlightsInitializer.class);

    private final PriceInitializer priceInitializer;
    private final ScheduledFlightsRepository scheduledFlightsRepository;
    private final RouteRepository routeRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    public ScheduledFlightsInitializer(ScheduledFlightsRepository scheduledFlightsRepository,
                                       PriceInitializer priceInitializer,
                                       RouteRepository routeRepository) {
        this.scheduledFlightsRepository = scheduledFlightsRepository;
        this.priceInitializer = priceInitializer;
        this.routeRepository = routeRepository;
    }

    // public void generateRandomScheduledFlightForFlights() {
    //     // Generate a random date within the next 365 days
    //     LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365));
    //     generateScheduledFlight(flight, randomDate, null);
    // }

    // public void generateRandomScheduledFlightForFlight(Flight flight, Route route) {
    //     // Generate a random date within the next 365 days
    //     LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365));
    //     generateScheduledFlight(flight, randomDate, route);
    // }

    // public void generateRandomScheduledFlightForFlight(Flight flight, LocalDate date) {
    //     generateScheduledFlight(flight, date, null);
    // }

public void generateScheduledFlights() {
    try {
        Iterable<Flight> allFlights = flightRepository.findAll();
        
        for (Flight flight : allFlights) {
            try {
            // Generate a random date within the next 90 days
            LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 91));

            // Fetch a random route
            Route route = routeRepository.findRandomRoute();
            if (route == null) {
                logger.error("Cannot generate scheduled flight: No routes available.");
                continue;
            }

            // Create and save the scheduled flight
            ScheduledFlights scheduledFlights = new ScheduledFlights(flight, route, randomDate);
            scheduledFlightsRepository.save(scheduledFlights);
            } catch (Exception e) {
                logger.error("Error generating scheduled flight for a flight", e);
                throw new RuntimeException("Scheduled flight generation failed: " + e.getMessage(), e);
            }
        }

        // Generate price for the scheduled flight
        priceInitializer.generatePrices();

        } catch (Exception e) {
            logger.error("Error generating scheduled flights", e);
        }
    }
}