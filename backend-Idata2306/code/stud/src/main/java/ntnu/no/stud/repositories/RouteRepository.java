package ntnu.no.stud.repositories;

import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.Route;

public interface RouteRepository extends CrudRepository<Route, Integer> {

  Route findById(int id);
}