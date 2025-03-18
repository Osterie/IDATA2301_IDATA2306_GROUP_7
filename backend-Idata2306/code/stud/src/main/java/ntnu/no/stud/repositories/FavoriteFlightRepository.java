package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.FavoriteFlight;

import org.springframework.data.repository.CrudRepository;

public interface FavoriteFlightRepository extends CrudRepository<FavoriteFlight, Integer> {
}