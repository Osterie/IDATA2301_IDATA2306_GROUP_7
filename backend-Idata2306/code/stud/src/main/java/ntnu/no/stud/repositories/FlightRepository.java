package ntnu.no.stud.repositories;

import java.util.List;
import ntnu.no.stud.entities.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Integer> {

  Flight findById(int id);
}