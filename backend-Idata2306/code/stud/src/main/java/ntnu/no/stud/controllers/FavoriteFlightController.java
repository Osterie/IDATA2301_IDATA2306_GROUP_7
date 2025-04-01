package ntnu.no.stud.controllers;

import org.springframework.web.bind.annotation.*;

import ntnu.no.stud.services.FavoriteFlightService;

import ntnu.no.stud.entities.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for React
public class FavoriteFlightController {

    private final FavoriteFlightService service;

    public FavoriteFlightController(FavoriteFlightService service) {
        this.service = service;
    }

    @GetMapping
    public List<FavoriteFlight> getAllFlights() {
        return service.getAllFlights();
    }

    @PostMapping
    public FavoriteFlight addFlight(@RequestBody FavoriteFlight flight) {
        return service.addFlight(flight);
    }

    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Long id) {
        service.deleteFlight(id);
    }
}
