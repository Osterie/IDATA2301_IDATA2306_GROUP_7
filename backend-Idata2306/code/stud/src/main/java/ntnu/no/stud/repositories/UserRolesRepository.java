package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.UserRole;

import org.springframework.data.repository.CrudRepository;

public interface UserRolesRepository extends CrudRepository<UserRole, Integer> {
}