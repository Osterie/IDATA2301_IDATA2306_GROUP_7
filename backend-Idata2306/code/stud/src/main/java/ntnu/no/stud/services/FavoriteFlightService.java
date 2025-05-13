package ntnu.no.stud.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ntnu.no.stud.repositories.FavoriteFlightRepository;
import ntnu.no.stud.entities.FavoriteFlight;
import java.util.List;

@Service
public class FavoriteFlightService {

    private static final Logger logger = LoggerFactory.getLogger(FavoriteFlightService.class);  // Logger instance
    private final FavoriteFlightRepository repository;

    public FavoriteFlightService(FavoriteFlightRepository repository) {
        this.repository = repository;
    }

    // Get all flights
    public List<FavoriteFlight> getAllFlights() {
        logger.debug("Fetching all flights from the repository");
        return (List<FavoriteFlight>) repository.findAll();
    }

    // Add a new flight
    public FavoriteFlight addFlight(FavoriteFlight flight) {
        logger.debug("Saving new flight: {}", flight);
        FavoriteFlight savedFlight = repository.save(flight);
        logger.debug("Saved flight: {}", savedFlight);
        return savedFlight;
    }

    // Delete a flight
    public void deleteFlight(Long id) {
        logger.debug("Deleting flight with ID: {}", id);
        // TODO: Fix this
        // repository.deleteById(id);
        logger.debug("Deleted flight with ID: {}", id);
    }
}
