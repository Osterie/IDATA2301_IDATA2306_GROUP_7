package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.FlightClasses;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FlightClassesRepository extends CrudRepository<FlightClasses, Integer> {

    @Query(value = "SELECT * FROM FlightClasses ORDER BY RAND() LIMIT 1")
    FlightClasses findRandomFlightClasses();
}