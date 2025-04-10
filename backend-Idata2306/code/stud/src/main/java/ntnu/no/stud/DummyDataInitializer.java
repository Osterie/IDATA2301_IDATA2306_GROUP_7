package ntnu.no.stud;

import java.io.IOException;
import java.util.Optional;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.repositories.UserRepository;
import ntnu.no.stud.repositories.UserRolesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * A class which inserts some dummy data into the database, when Spring Boot app
 * has started.
 */
@Component
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserRolesRepository roleRepository;

  @Autowired
  private AccessUserService userService;

  private final Logger logger = LoggerFactory.getLogger("DummyInit");

  /**
   * This method is called when the application is ready (loaded).
   *
   * @param event Event which we don't use
   */
  @Override
  public void onApplicationEvent(ApplicationReadyEvent event) {
    Optional<User> existingAdminUser = userRepository.findByUsername("admin");
    if (existingAdminUser.isEmpty()) {
      logger.info("Importing test data...");
  
      try {
        // Create admin user
        userService.tryCreateNewUser("admin", "adminPassword", "admin@gmail.com");
        User admin = userRepository.findByUsername("admin").orElseThrow();
  
        UserRole adminRole = new UserRole(admin, "ADMIN");
        admin.addRole(adminRole);
        userRepository.save(admin); // Will cascade to roles if CascadeType.ALL is set
  
        // Create default user
        userService.tryCreateNewUser("defaultUser", "defaultUserPassword", "defaultUser@gmail.com");
        User defaultUser = userRepository.findByUsername("defaultUser").orElseThrow();
  
        UserRole userRole = new UserRole(defaultUser, "USER");
        defaultUser.addRole(userRole);
        userRepository.save(defaultUser);
  
        logger.info("DONE importing test data");
  
      } catch (IOException e) {
        logger.error("Failed to import test data: {}", e.getMessage());
      }
    } else {
      logger.info("Users already in the database, not importing anything");
    }
  }
}
