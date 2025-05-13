package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.RouteRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RouteInitializer {

    
    private static final Logger logger = LoggerFactory.getLogger(RouteInitializer.class);

    private final RouteRepository routeRepository;
    private final AirportRepository airportRepository;

    @Autowired
    public RouteInitializer(RouteRepository routeRepository, AirportRepository airportRepository) {
        this.routeRepository = routeRepository;
        this.airportRepository = airportRepository;
    }

    public void generateRoutes() {
        try {
            // Fetch all airports from the database
            Iterable<Airport> airports = airportRepository.findAll();
            for (Airport departure : airports) {
                for (Airport destination : airports) {
                    if (!departure.equals(destination)) { // Ensure departure and destination are different
                        // Create and save the route
                        Route route = new Route(departure, destination);
                        routeRepository.save(route);
                    }
                }
            }

        } catch (Exception e) {
            logger.error("Error generating routes: " + e.getMessage());
        }
    }
}