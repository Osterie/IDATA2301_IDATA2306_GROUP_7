package ntnu.no.stud.controllers;

import org.springframework.web.bind.annotation.RestController;

import ntnu.no.stud.repositories.UserRepository;
import ntnu.no.stud.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;


/**
 * 
 * A REST API controller which responds to HTTP requests for /hello.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class UserRequestController {

  @Autowired
  private UserRepository userRepository; // Inject the user repository

    /**
   * Edits a information in user table
   */
  @PostMapping("/editUser")
  @PreAuthorize("hasRole('ADMIN')")
  public User editUser(@Valid @RequestBody User user) {
    if (!userRepository.existsById(user.getId())) {
      throw new IllegalArgumentException("User with id " + user.getId() + " does not exist");
    }
    
    return userRepository.save(user);
  }

    /**
   * Adds a user to the user table
   */
  @PostMapping("/addUser")
  @PreAuthorize("hasRole('ADMIN')")
  public User addUser(@Valid @RequestBody User user) {
    if (userRepository.existsById(user.getId())) {
      throw new IllegalArgumentException("User with id " + user.getId() + " already exists");
    }
    return userRepository.save(user); 
  }

    /**
   * Remove a user from the user table
   */
  @PostMapping("/removeUser")
  @PreAuthorize("hasRole('ADMIN')")
  public void removeUser(@RequestBody User user) {
    if (!userRepository.existsById(user.getId())) {
      throw new IllegalArgumentException("User with id " + user.getId() + " does not exist");
    }
    userRepository.delete(user);
  }


}