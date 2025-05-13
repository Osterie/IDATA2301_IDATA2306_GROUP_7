package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.ScheduledFlights;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface ScheduledFlightsRepository extends CrudRepository<ScheduledFlights, Integer> {

    @Query(value = "SELECT * FROM scheduled_flights ORDER BY RAND() LIMIT 1", nativeQuery = true)
    ScheduledFlights findRandomScheduledFlight();
}