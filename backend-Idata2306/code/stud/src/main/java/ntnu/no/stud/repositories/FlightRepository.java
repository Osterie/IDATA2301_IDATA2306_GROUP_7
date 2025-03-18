package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Flight;

import org.springframework.data.repository.CrudRepository;

public interface FlightRepository extends CrudRepository<Flight, Integer> {
}