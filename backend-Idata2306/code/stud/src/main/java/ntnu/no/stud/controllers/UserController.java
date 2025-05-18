package ntnu.no.stud.controllers;

import ntnu.no.stud.dto.UserProfileDto;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.AccessUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST API controller serving endpoints for users.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class); // Logger instance

  @Autowired
  private AccessUserService userService;

  /**
   * Return user profile information.
   *
   * @param username Username for which the profile is requested
   * @return The profile information or error code when not authorized
   */
  @GetMapping("/api/users/{username}")
  public ResponseEntity<?> getProfile(@PathVariable String username) {
    logger.info("Request received to fetch profile for username: {}", username);
    
    User sessionUser = userService.getSessionUser();
    if (sessionUser != null && sessionUser.getUsername().equals(username)) {
      UserProfileDto profile = new UserProfileDto(sessionUser.getEmail());
      logger.info("Successfully fetched profile for username: {}", username);
      return new ResponseEntity<>(profile, HttpStatus.OK);
    } else if (sessionUser == null) {
      logger.warn("Unauthorized access attempt for username: {}", username);
      return new ResponseEntity<>("Profile data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      logger.warn("Forbidden access attempt for username: {}", username);
      return new ResponseEntity<>("Profile data for other users not accessible!", HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Update user profile information.
   *
   * @param username Username for which the profile is updated
   * @return HTTP 200 OK or error code with error message
   */
  @PutMapping("/api/users/{username}")
  public ResponseEntity<String> updateProfile(@PathVariable String username, @RequestBody UserProfileDto profileData) {
    logger.info("Request received to update profile for username: {}", username);
    
    User sessionUser = userService.getSessionUser();
    ResponseEntity<String> response;
    
    if (sessionUser != null && sessionUser.getUsername().equals(username)) {
      if (profileData != null) {
        if (userService.updateProfile(sessionUser, profileData)) {
          logger.info("Successfully updated profile for username: {}", username);
          response = new ResponseEntity<>("", HttpStatus.OK);
        } else {
          logger.error("Failed to update profile for username: {}", username);
          response = new ResponseEntity<>("Could not update Profile data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else {
        logger.error("Profile data not supplied for username: {}", username);
        response = new ResponseEntity<>("Profile data not supplied", HttpStatus.BAD_REQUEST);
      }
    } else if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to update profile for username: {}", username);
      response = new ResponseEntity<>("Profile data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    } else {
      logger.warn("Forbidden access attempt to update profile for username: {}", username);
      response = new ResponseEntity<>("Profile data for other users not accessible!", HttpStatus.FORBIDDEN);
    }
    return response;
  }

  // Retreives all users (if you are authenticated as admin) 
  @GetMapping("/api/getUsers")
  // @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getAllUsers() {
    logger.info("Request received to fetch all users.");
    
    User sessionUser = userService.getSessionUser();
    if (sessionUser != null && sessionUser.isAdmin()) {
      return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    } else if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to fetch all users.");
      return new ResponseEntity<>("Access to user list is only for authenticated admins", HttpStatus.UNAUTHORIZED);
    } else {
      logger.warn("Forbidden access attempt to fetch all users.");
      return new ResponseEntity<>("Access to user list is only for authenticated admins", HttpStatus.FORBIDDEN);
    }
  }

  @DeleteMapping("/api/deleteUser/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable int id) {

    logger.info("Request received to delete user with ID: {}", id);
    
    User sessionUser = userService.getSessionUser();
    if (sessionUser != null && sessionUser.isAdmin()) {
      if (userService.deleteUser(id)) {
        logger.info("Successfully deleted user with ID: {}", id);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
      } else {
        logger.error("Failed to delete user with ID: {}", id);
        return new ResponseEntity<>("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to delete user with ID: {}", id);
      return new ResponseEntity<>("Access to delete users is only for authenticated admins", HttpStatus.UNAUTHORIZED);
    } else {
      logger.warn("Forbidden access attempt to delete user with ID: {}", id);
      return new ResponseEntity<>("Access to delete users is only for authenticated admins", HttpStatus.FORBIDDEN);
    }
  }

  @DeleteMapping("/api/deleteSelf/{id}")
  public ResponseEntity<?> deleteSelf(@PathVariable int id) {

    logger.info("Request received to delete user with ID: {}", id);
    
    User sessionUser = userService.getSessionUser();
    if (sessionUser != null && sessionUser.getId() == id) {
      if (userService.deleteUser(id)) {
        logger.info("Successfully deleted self with ID: {}", id);
        return new ResponseEntity<>("Self deleted successfully", HttpStatus.OK);
      } else {
        logger.error("Failed to delete self with ID: {}", id);
        return new ResponseEntity<>("Failed to delete self", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to delete self with ID: {}", id);
      return new ResponseEntity<>("Access to delete self is only for authenticated one self", HttpStatus.UNAUTHORIZED);
    } else {
      logger.warn("Forbidden access attempt to delete self with ID: {}", id);
      return new ResponseEntity<>("Access to delete self is only for authenticated one self", HttpStatus.FORBIDDEN);
    }
  }


  private static void simulateLongOperation() {
    try {
      Thread.sleep(2000);  // Simulating a long operation, e.g., a database transaction
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
  }
}
