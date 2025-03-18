package ntnu.no.stud.repositories;

import ntnu.no.stud.entities.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}