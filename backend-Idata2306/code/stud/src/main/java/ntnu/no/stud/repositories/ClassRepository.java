package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.ClassEntity;

import org.springframework.data.repository.CrudRepository;

public interface ClassRepository extends CrudRepository<ClassEntity, Integer> {
}