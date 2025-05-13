package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.FlightCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightCompanyRepository extends JpaRepository<FlightCompany, Integer> {
    FlightCompany findByName(String name);
    boolean existsByName(String name);
}
