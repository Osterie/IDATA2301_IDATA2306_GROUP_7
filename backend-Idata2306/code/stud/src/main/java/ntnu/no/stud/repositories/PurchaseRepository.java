package ntnu.no.stud.repositories;

import java.util.List;
import ntnu.no.stud.entities.Purchases;
import org.springframework.data.repository.CrudRepository;

public interface PurchaseRepository extends CrudRepository<Purchases, Integer> {

    List<Purchases> findAllByUserId(Long userId);
}