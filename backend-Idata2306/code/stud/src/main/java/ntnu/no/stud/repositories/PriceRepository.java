package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.models.Passenger;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PriceRepository extends CrudRepository<Price, Integer> {

    // @Query("SELECT p FROM Price p")
    // List<Price> searchForFlights(@Param("scheduledFlight") ScheduledFlights
    // scheduledFlight);

    @Query("SELECT p FROM Price p " +
            "JOIN p.scheduledFlight s " +
            "JOIN s.route r " +
            "WHERE r.departureAirport.airportCode = :#{#scheduledFlight.route.departureAirport.airportCode} " +
            "AND r.arrivalAirport.airportCode = :#{#scheduledFlight.route.arrivalAirport.airportCode} " +
            "AND s.date BETWEEN :fromDate AND :toDate")
    List<Price> searchForFlights(@Param("scheduledFlight") ScheduledFlights scheduledFlight,
            @Param("fromDate") LocalDate fromDate, @Param("toDate") LocalDate toDate);

}