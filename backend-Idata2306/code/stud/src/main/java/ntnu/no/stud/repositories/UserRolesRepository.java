package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.UserRoles;

import org.springframework.data.repository.CrudRepository;

public interface UserRolesRepository extends CrudRepository<UserRoles, Integer> {
}