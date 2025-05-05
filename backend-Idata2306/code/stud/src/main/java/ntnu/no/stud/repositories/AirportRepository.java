package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Airport;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository<Airport, Integer> {

    @Query(value = "SELECT * FROM Airport ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Airport findRandomAirport();
}