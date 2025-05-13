package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.ClassEntity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ClassRepository extends CrudRepository<ClassEntity, Integer> {

    @Query(value = "SELECT * FROM class ORDER BY RAND() LIMIT 1", nativeQuery = true)
    ClassEntity getRandomClass();
}