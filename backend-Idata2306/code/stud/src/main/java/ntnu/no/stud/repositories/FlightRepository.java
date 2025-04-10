package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.ClassEntity;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.models.Passenger;
import ntnu.no.stud.models.SearchedFlight;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface FlightRepository extends CrudRepository<Flight, Integer> {

    // @Query("SELECT * FROM Flight")
    // List<Flight> searchForFlights(SearchedFlight searchedFlight);

    // @Query("SELECT f FROM Flight f WHERE f.route = :route AND f.departureDate BETWEEN :startDate AND :endDate AND f.airline IN :airlines")
    @Query("SELECT f FROM Flight f")
    List<Flight> searchForFlights(@Param("route") Route route, @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate, @Param("passengers") List<Passenger> passengers);

    @Query("SELECT f FROM Flight f")
    List<Flight> findAllFlights();

    @Query(value = "SELECT * FROM Flight ORDER BY RAND() LIMIT 1")
    Flight findRandomFlight();
}