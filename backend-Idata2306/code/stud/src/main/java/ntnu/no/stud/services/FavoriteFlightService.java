package ntnu.no.stud.services;
import org.springframework.stereotype.Service;
import ntnu.no.stud.repositories.*;
import ntnu.no.stud.entities.*;
import java.util.List;

@Service
public class FavoriteFlightService {
    
    private final FavoriteFlightRepository repository;

    public FavoriteFlightService(FavoriteFlightRepository repository) {
        this.repository = repository;
    }

    public List<FavoriteFlight> getAllFlights() {
        return repository.findAll();
    }

    public FavoriteFlight addFlight(FavoriteFlight flight) {
        return repository.save(flight);
    }

    public void deleteFlight(Long id) {
        repository.deleteById(id);
    }
}
