package ntnu.no.stud.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import ntnu.no.stud.services.FavoriteFlightService;
import ntnu.no.stud.entities.FavoriteFlight;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for React
public class FavoriteFlightController {

    private static final Logger logger = LoggerFactory.getLogger(FavoriteFlightController.class);  // Logger instance

    private final FavoriteFlightService service;

    public FavoriteFlightController(FavoriteFlightService service) {
        this.service = service;
    }

    // Get all favorite flights
    @GetMapping
    public List<FavoriteFlight> getAllFlights() {
        logger.info("Fetching all favorite flights");
        List<FavoriteFlight> flights = service.getAllFlights();
        logger.info("Found {} flights", flights.size());  // Log the number of flights retrieved
        return flights;
    }

    // Add a new favorite flight
    @PostMapping
    public FavoriteFlight addFlight(@RequestBody FavoriteFlight flight) {
        logger.info("Adding new favorite flight: {}", flight);
        FavoriteFlight addedFlight = service.addFlight(flight);
        logger.info("Successfully added flight: {}", addedFlight);
        return addedFlight;
    }

    // Delete a favorite flight by ID
    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Long id) {
        logger.info("Attempting to delete flight with ID: {}", id);
        service.deleteFlight(id);
        logger.info("Successfully deleted flight with ID: {}", id);
    }
}
