package ntnu.no.stud.repositories;

import java.util.List;
import ntnu.no.stud.entities.Purchase;
import org.springframework.data.repository.CrudRepository;

public interface PurchaseRepository extends CrudRepository<Purchase, Integer> {

    List<Purchase> findAllByUserId(Long userId);
}