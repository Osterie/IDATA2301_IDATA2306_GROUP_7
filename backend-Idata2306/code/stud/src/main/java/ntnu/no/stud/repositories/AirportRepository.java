package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Airport;

import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository<Airport, Integer> {
}