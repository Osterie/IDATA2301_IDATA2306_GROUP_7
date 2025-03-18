package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Price;

import org.springframework.data.repository.CrudRepository;

public interface PriceRepository extends CrudRepository<Price, Integer> {
}