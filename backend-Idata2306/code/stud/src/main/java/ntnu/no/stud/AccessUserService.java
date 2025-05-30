package ntnu.no.stud;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import ntnu.no.stud.dto.UserProfileModel;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.repositories.UserRepository;
import ntnu.no.stud.security.AccessUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * Provides AccessUserDetails needed for authentication.
 */
@Service
public class AccessUserService implements UserDetailsService {
  private static final int MIN_PASSWORD_LENGTH = 6;
  @Autowired
  UserRepository userRepository;

  /**
   * Load user by username.
   *
   * @param username Username of the user to load
   * @return UserDetails object containing user information
   * @throws UsernameNotFoundException if user is not found
   */
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
      return new AccessUserDetails(user.get());
    } else {
      throw new UsernameNotFoundException("User " + username + "not found");
    }
  }

  /**
   * Get the user which is authenticated for the current session.
   *
   * @return User object or null if no user has logged in
   */
  public User getSessionUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    String username = authentication.getName();
    return userRepository.findByUsername(username).orElse(null);
  }

  /**
   * Gets all users in the database.
   * 
   * @return All users in the database
   */
  public Iterable<User> getAllUsers() {
    return userRepository.findAll();
  }

  /**
   * Check if user with given username exists in the database.
   *
   * @param username Username of the user to check, case-sensitive
   * @return True if user exists, false otherwise
   */
  private boolean userExists(String username) {
    try {
      loadUserByUsername(username);
      return true;
    } catch (UsernameNotFoundException ex) {
      return false;
    }
  }

  /**
   * Try to create a new user.
   *
   * @param username Username of the new user
   * @param password Plaintext password of the new user
   * @param email    Email of the new user
   * @throws IOException when creation of the user failed
   */
  public void tryCreateNewUser(String username, String password, String email) throws IOException {
    String errorMessage;
    if ("".equals(username)) {
      errorMessage = "Username can't be empty";
    } else if (userExists(username)) {
      errorMessage = "Username already taken";
    } else if (email == null || email.length() == 0) {
      errorMessage = "Email can't be empty";
    } else if (userRepository.findByEmail(email).isPresent()) {
      errorMessage = "Email already taken";
    } else {
      errorMessage = checkPasswordRequirements(password);
      if (errorMessage == null) {
        createUser(username, password, email);
      }
    }
    if (errorMessage != null) {
      throw new IOException(errorMessage);
    }
  }

  /**
   * Check if password matches the requirements.
   *
   * @param password A password to check
   * @return null if all OK, error message on error
   */
  private String checkPasswordRequirements(String password) {
    String errorMessage = null;
    if (password == null || password.length() == 0) {
      errorMessage = "Password can't be empty";
    } else if (password.length() < MIN_PASSWORD_LENGTH) {
      errorMessage = "Password must be at least " + MIN_PASSWORD_LENGTH + " characters";
    }
    return errorMessage;
  }

  /**
   * Create a new user in the database.
   *
   * @param username Username of the new user
   * @param password Plaintext password of the new user
   */
  private void createUser(String username, String password, String email) {
    // Check if user already exists
    if (userExists(username)) {
      throw new IllegalArgumentException("User already exists");
    }
    User user = new User(username, createHash(password), email);
    userRepository.save(user);
  }

  public boolean deleteUser(int id) {
    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      userRepository.delete(user.get());
      return true;
    } else {
      return false;
    }
  }

  /**
   * Create a secure hash of a password.
   *
   * @param password Plaintext password
   * @return BCrypt hash, with random salt
   */
  private String createHash(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt());
  }

  /**
   * Update profile information for a user.
   *
   * @param user        User to update
   * @param profileData Profile data to set for the user
   * @return True on success, false otherwise
   */
  public boolean updateProfile(User user, UserProfileModel profileData) {
    user.setEmail(profileData.getEmail());
    userRepository.save(user);
    return true;
  }
}
