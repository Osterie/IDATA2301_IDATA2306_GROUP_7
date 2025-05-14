package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Airport;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AirportRepository extends CrudRepository<Airport, Integer> {

    @Query(value = "SELECT * FROM airport ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Airport findRandomAirport();

    @Query(value = "SELECT * FROM airport", nativeQuery = true)
    List<Airport> getAllAirports();
}