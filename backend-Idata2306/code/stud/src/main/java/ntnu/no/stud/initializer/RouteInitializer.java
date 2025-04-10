package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RouteInitializer {

    private final RouteRepository routeRepository;
    private final AirportRepository airportRepository;

    @Autowired
    public RouteInitializer(RouteRepository routeRepository, AirportRepository airportRepository) {
        this.routeRepository = routeRepository;
        this.airportRepository = airportRepository;
    }

    public void generateRandomRoutes(int numberOfRoutes) {
        for (int i = 0; i < numberOfRoutes; i++) {
            // Fetch a random departure airport
            Airport departure = airportRepository.findRandomAirport();
            if (departure == null) {
                System.err.println("Cannot generate routes: No airports available.");
                return;
            }

            // Fetch a random destination airport
            Airport destination;
            do {
                destination = airportRepository.findRandomAirport();
            } while (destination == null || departure.equals(destination)); // Ensure departure and destination are different

            // Create and save the route
            Route route = new Route(departure, destination);
            routeRepository.save(route);
        }

        System.out.println(numberOfRoutes + " random routes generated successfully.");
    }
}