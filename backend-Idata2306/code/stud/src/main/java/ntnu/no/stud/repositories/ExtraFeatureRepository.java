package ntnu.no.stud.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.ScheduledFlights;

public interface ExtraFeatureRepository extends CrudRepository<ExtraFeature, Integer> {

  ExtraFeature findById(int id);

  /**
   * Finds an ExtraFeature by its name.
   * 
   * @param name the name of the ExtraFeature
   * @return the ExtraFeature with the given name
   */
  @Query("SELECT e FROM ExtraFeature e WHERE e.name = :name")
  ExtraFeature findByName(@Param("name") String name);


  @Query(value = "SELECT * FROM extra_feature ORDER BY RAND() LIMIT 1", nativeQuery = true)
  ExtraFeature findRandomExtraFeature();
}