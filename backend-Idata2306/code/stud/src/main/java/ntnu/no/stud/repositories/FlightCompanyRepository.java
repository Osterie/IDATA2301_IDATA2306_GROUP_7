package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.FlightCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FlightCompanyRepository extends JpaRepository<FlightCompany, Integer> {
    FlightCompany findByName(String name);
    boolean existsByName(String name);

    @Query(value = "SELECT id FROM flight_company ORDER BY RAND() LIMIT 1", nativeQuery = true)
    int getRandomCompanyId();

    @Query(value = "SELECT abbreviation FROM flight_company WHERE id = :id", nativeQuery = true)
    String findAbriviationById(int id);

    @Query(value = "SELECT * FROM flight_company WHERE id = :id", nativeQuery = true)
    FlightCompany findById(int id);
}
