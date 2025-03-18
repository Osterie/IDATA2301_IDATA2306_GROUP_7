package ntnu.no.stud.repositories;

import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.Flight;

public interface FlightRepository extends CrudRepository<Flight, Integer> {

  Flight findById(int id);
}