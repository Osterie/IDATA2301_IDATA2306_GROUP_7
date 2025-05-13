package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<User, Integer> {
}