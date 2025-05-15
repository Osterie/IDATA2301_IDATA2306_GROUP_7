package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.FlightClasses;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FlightClassesRepository extends CrudRepository<FlightClasses, Integer> {

    @Query(value = "SELECT * FROM flight_classes ORDER BY RAND() LIMIT 1", nativeQuery = true)
    FlightClasses findRandomFlightClasses();

    @Query(value = "SELECT * FROM flight_classes WHERE flight_id = :flightId", nativeQuery = true)
    List<FlightClasses> findByFlightId(int flightId);

    @Query(value = "UPDATE flight_classes SET available_seats - 1 WHERE flight_id = :flightId", nativeQuery = true)
    Void removeAvaliableSeat(int flightId);
}