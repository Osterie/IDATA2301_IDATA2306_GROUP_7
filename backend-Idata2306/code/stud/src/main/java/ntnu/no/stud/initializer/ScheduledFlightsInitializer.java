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

    @Autowired
    private final PriceInitializer priceInitializer;

    @Autowired
    private final ScheduledFlightsRepository scheduledFlightsRepository;

    @Autowired
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
        try {
            // Fetch all available routes
            Route route = routeRepository.findRandomRoute();
    
            if (route == null) {
                logger.error("Cannot generate scheduled flight: No routes available.");
                return;
            }
    
            // Generate a random date within the next year
            LocalDate randomDate = LocalDate.now().plusDays(ThreadLocalRandom.current().nextInt(1, 365));
    
            // Create and save the scheduled flight
            ScheduledFlights scheduledFlights = new ScheduledFlights(flight, route, randomDate);
            scheduledFlightsRepository.save(scheduledFlights);

            priceInitializer.generatePriceForScheduledFlight(scheduledFlights);
    
            logger.info("Scheduled flight created successfully for flight: " + flight.getName());
        } catch (Exception e) {
            logger.error("Error generating scheduled flight for flight: " + flight.getName(), e);
        }
    }
}