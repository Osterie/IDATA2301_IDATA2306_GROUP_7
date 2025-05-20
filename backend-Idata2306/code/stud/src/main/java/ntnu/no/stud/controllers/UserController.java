package ntnu.no.stud.controllers;

import ntnu.no.stud.dto.UserProfileDto;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.AccessUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * REST API controller serving endpoints for users.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
@Tag(name = "User Management", description = "Endpoints for user profiles and administration")
public class UserController {

  private static final Logger logger = LoggerFactory.getLogger(UserController.class);

  @Autowired
  private AccessUserService userService;

  @Operation(summary = "Get user profile",
             description = "Returns the profile information for the specified username. " +
                           "Only accessible by the authenticated user matching the username.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Profile fetched successfully"),
    @ApiResponse(responseCode = "401", description = "User not authenticated"),
    @ApiResponse(responseCode = "403", description = "User forbidden from accessing others' profiles")
  })
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

  @Operation(summary = "Update user profile",
             description = "Updates the profile information for the specified username. " +
                           "Only accessible by the authenticated user matching the username.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
    @ApiResponse(responseCode = "400", description = "Invalid profile data provided"),
    @ApiResponse(responseCode = "401", description = "User not authenticated"),
    @ApiResponse(responseCode = "403", description = "User forbidden from updating others' profiles"),
    @ApiResponse(responseCode = "500", description = "Server error when updating profile")
  })
  @PutMapping("/api/users/{username}")
  public ResponseEntity<String> updateProfile(@PathVariable String username, @RequestBody UserProfileDto profileData) {
    logger.info("Request received to update profile for username: {}", username);
    User sessionUser = userService.getSessionUser();

    if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to update profile for username: {}", username);
      return new ResponseEntity<>("Profile data accessible only to authenticated users", HttpStatus.UNAUTHORIZED);
    }
    if (!sessionUser.getUsername().equals(username)) {
      logger.warn("Forbidden access attempt to update profile for username: {}", username);
      return new ResponseEntity<>("Profile data for other users not accessible!", HttpStatus.FORBIDDEN);
    }
    if (profileData == null) {
      logger.error("Profile data not supplied for username: {}", username);
      return new ResponseEntity<>("Profile data not supplied", HttpStatus.BAD_REQUEST);
    }
    if (userService.updateProfile(sessionUser, profileData)) {
      logger.info("Successfully updated profile for username: {}", username);
      return new ResponseEntity<>("", HttpStatus.OK);
    } else {
      logger.error("Failed to update profile for username: {}", username);
      return new ResponseEntity<>("Could not update Profile data", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Operation(summary = "Get all users",
             description = "Returns all users. Accessible only to authenticated admins.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "User list retrieved successfully"),
    @ApiResponse(responseCode = "401", description = "User not authenticated"),
    @ApiResponse(responseCode = "403", description = "User forbidden from accessing user list")
  })
  @GetMapping("/api/getUsers")
  public ResponseEntity<?> getAllUsers() {
    logger.info("Request received to fetch all users.");
    User sessionUser = userService.getSessionUser();
    if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to fetch all users.");
      return new ResponseEntity<>("Access to user list is only for authenticated admins", HttpStatus.UNAUTHORIZED);
    }
    if (!sessionUser.isAdmin()) {
      logger.warn("Forbidden access attempt to fetch all users.");
      return new ResponseEntity<>("Access to user list is only for authenticated admins", HttpStatus.FORBIDDEN);
    }
    return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
  }

  @Operation(summary = "Delete user by ID",
             description = "Deletes a user by ID. Only authenticated admins can delete users.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "User deleted successfully"),
    @ApiResponse(responseCode = "401", description = "User not authenticated"),
    @ApiResponse(responseCode = "403", description = "User forbidden from deleting users"),
    @ApiResponse(responseCode = "500", description = "Failed to delete user")
  })
  @DeleteMapping("/api/deleteUser/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable int id) {
    logger.info("Request received to delete user with ID: {}", id);
    User sessionUser = userService.getSessionUser();
    if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to delete user with ID: {}", id);
      return new ResponseEntity<>("Access to delete users is only for authenticated admins", HttpStatus.UNAUTHORIZED);
    }
    if (!sessionUser.isAdmin()) {
      logger.warn("Forbidden access attempt to delete user with ID: {}", id);
      return new ResponseEntity<>("Access to delete users is only for authenticated admins", HttpStatus.FORBIDDEN);
    }
    if (userService.deleteUser(id)) {
      logger.info("Successfully deleted user with ID: {}", id);
      return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    } else {
      logger.error("Failed to delete user with ID: {}", id);
      return new ResponseEntity<>("Failed to delete user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Operation(summary = "Delete current user",
             description = "Deletes the authenticated user’s own account.")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "User deleted successfully"),
    @ApiResponse(responseCode = "401", description = "User not authenticated"),
    @ApiResponse(responseCode = "500", description = "Failed to delete user")
  })
  @DeleteMapping("/api/deleteSelf")
  public ResponseEntity<?> deleteSelf() {
    logger.info("Request received to delete self.");
    User sessionUser = userService.getSessionUser();
    if (sessionUser == null) {
      logger.warn("Unauthorized access attempt to delete self.");
      return new ResponseEntity<>("Access to delete self is only for authenticated users", HttpStatus.UNAUTHORIZED);
    }
    if (userService.deleteUser(sessionUser.getId())) {
      logger.info("Successfully deleted self with ID: {}", sessionUser.getId());
      return new ResponseEntity<>("Self deleted successfully", HttpStatus.OK);
    } else {
      logger.error("Failed to delete self with ID: {}", sessionUser.getId());
      return new ResponseEntity<>("Failed to delete self", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
