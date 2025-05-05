package ntnu.no.stud.repositories;

import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightAccommodation;

public interface FlightAccommodationRepository extends CrudRepository<FlightAccommodation, Integer> {

  FlightAccommodation findById(int id);

  boolean existsByFlightAndExtraFeature(Flight flight, ExtraFeature extraFeature);
}