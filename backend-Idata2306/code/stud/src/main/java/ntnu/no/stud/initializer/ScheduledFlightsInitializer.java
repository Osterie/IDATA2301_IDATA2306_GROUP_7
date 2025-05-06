package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;

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
    public ScheduledFlightsInitializer(ScheduledFlightsRepository scheduledFlightsRepository,
                                       PriceInitializer priceInitializer,
                                       RouteRepository routeRepository) {
        this.scheduledFlightsRepository = scheduledFlightsRepository;
        this.priceInitializer = priceInitializer;
        this.routeRepository = routeRepository;
    }

    public void generateRandomScheduledFlightForFlight(Flight flight) {
        // Generate a random date within the next 365 days
        LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365));
        generateScheduledFlight(flight, randomDate, null);
    }

    public void generateRandomScheduledFlightForFlight(Flight flight, Route route) {
        // Generate a random date within the next 365 days
        LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365));
        generateScheduledFlight(flight, randomDate, route);
    }

    public void generateRandomScheduledFlightForFlight(Flight flight, LocalDate date) {
        generateScheduledFlight(flight, date, null);
    }

    private void generateScheduledFlight(Flight flight, LocalDate date, Route route) {
        try {
            // Fetch a random route
            if (route == null) {
                route = routeRepository.findRandomRoute();
            }

            if (route == null) {
                logger.error("Cannot generate scheduled flight: No routes available.");
                return;
            }

            // Create and save the scheduled flight
            ScheduledFlights scheduledFlights = new ScheduledFlights(flight, route, date);
            scheduledFlightsRepository.save(scheduledFlights);

            // Generate price for the scheduled flight
            priceInitializer.generatePriceForScheduledFlight(scheduledFlights);

            logger.info("Scheduled flight created successfully for flight: " + flight.getName());
        } catch (Exception e) {
            logger.error("Error generating scheduled flight for flight: " + flight.getName(), e);
        }
    }
}