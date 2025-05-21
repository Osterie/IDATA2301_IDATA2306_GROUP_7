package ntnu.no.stud.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightAccommodation;

public interface FlightAccommodationRepository extends CrudRepository<FlightAccommodation, Integer> {

  FlightAccommodation findById(int id);

  List<FlightAccommodation> findByFlightId(int flightId);

  boolean existsByFlightAndExtraFeature(Flight flight, ExtraFeature extraFeature);
}