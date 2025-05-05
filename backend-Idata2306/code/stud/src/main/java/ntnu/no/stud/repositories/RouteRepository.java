package ntnu.no.stud.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.Route;

public interface RouteRepository extends CrudRepository<Route, Integer> {

  Route findById(int id);

  @Query(value = "SELECT * FROM Route ORDER BY RAND() LIMIT 1", nativeQuery = true)
  Route findRandomRoute();
}