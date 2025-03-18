package ntnu.no.stud.repositories;

import org.springframework.data.repository.CrudRepository;

import ntnu.no.stud.entities.ExtraFeature;

public interface ExtraFeatureRepository extends CrudRepository<ExtraFeature, Integer> {

  ExtraFeature findById(int id);
}