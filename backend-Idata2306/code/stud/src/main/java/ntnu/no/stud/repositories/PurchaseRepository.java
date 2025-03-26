package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.Purchases;

import org.springframework.data.repository.CrudRepository;

public interface PurchaseRepository extends CrudRepository<Purchases, Integer> {
}