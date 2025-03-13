package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Flight;
import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Integer> {

  Flight findById(int id);

  Iterable<Flight> findAll();

  Flight save(Flight flight);

  void deleteById(int id);
}