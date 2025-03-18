package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.ScheduledFlights;

import org.springframework.data.repository.CrudRepository;

public interface ScheduledFlightsRepository extends CrudRepository<ScheduledFlights, Integer> {
}