package ntnu.no.stud.controllers;

import java.io.IOException;
import java.util.List;

import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.dto.AuthenticationRequest;
import ntnu.no.stud.dto.AuthenticationResponse;
import ntnu.no.stud.dto.SignupDto;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.models.EditRoleModel;
import ntnu.no.stud.models.EditUsersInRoleModel;
import ntnu.no.stud.models.SetProductVisibilityModel;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.RoleRepository;
import ntnu.no.stud.repositories.UserRepository;
import ntnu.no.stud.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller responsible for administration.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class AdministrationController {

    @Autowired
    private UserRepository userRepository; // Inject the repository
    @Autowired
    private RoleRepository roleRepository; // Inject the repository

    @Autowired
    private PriceRepository priceRepository; // Inject the repository

    public AdministrationController(UserRepository userRepository, RoleRepository roleRepository, PriceRepository priceRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.priceRepository = priceRepository;
    }

    @PostMapping("api/addRole")
    public ResponseEntity<String> AddRole(@RequestBody EditRoleModel model){

        // Check if the user exists in the database
        User user = userRepository.findById(model.getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + model.getId());
        }

        // Check if user already has role.
        boolean hasRole = user.hasRole(model.getRoleName());
        if (hasRole) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already has role: " + model.getRoleName());
        }

        // Create a new role and add it to the user
        UserRole role = new UserRole(user, model.getRoleName());

        user.addRole(role);
        userRepository.save(user); // Save the user, which will cascade to the role if CascadeType.ALL is set

        return ResponseEntity.ok("Role added successfully to user: " + model.getId());
    }

    @PostMapping("api/removeRole")
    public ResponseEntity<String> RemoveRole(@RequestBody EditRoleModel model){

        // Check if the user exists in the database
        User user = userRepository.findById(model.getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + model.getId());
        }

        // Check if user already has role.
        boolean hasRole = user.hasRole(model.getRoleName());

        if (!hasRole) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not have role: " + model.getRoleName());
        }

        // Remove the role from the user
        UserRole role = new UserRole(user, model.getRoleName());
        user.removeRole(role);
        userRepository.save(user); // Save the user, which will cascade to the role if CascadeType.ALL is set

        return ResponseEntity.ok("Role removed successfully from user: " + model.getId());
    }

    
    @PostMapping("/api/editUsersInRole")
    public ResponseEntity<String> EditUsersInRole(@RequestBody EditUsersInRoleModel model) {
        List<User> users = model.getUsers();

        UserRole role = model.getRole();
        if (role == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role is required.");
        }
        if (users == null || users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Users are required.");
        }

        // Iterate through the list of users and update their roles
        for (User user : users) {
            // Check if the user exists in the database
            User existingUser = userRepository.findById(user.getId()).orElse(null);
            if (existingUser != null) {

                // Check if the user already has the role
                boolean hasRole = existingUser.hasRole(role.getRole());

                if (!hasRole) {
                    // If the user is selected and doesn't have the role, add the role
                    existingUser.addRole(role);
                } else if (hasRole) {
                    // If the user is not selected and has the role, remove the role
                    existingUser.removeRole(role);
                } else {
                    // If the user's selection state matches their current role, do nothing
                    continue;
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + user.getUsername());
            }
        }

        return ResponseEntity.ok("Users updated successfully.");        
    }
    
    @PostMapping("/api/setFlightProductVisibility")
    public ResponseEntity<String> SetFlightProductVisibility(@RequestBody SetProductVisibilityModel model) {
        // Check if the priceId is valid
        if (model.getPriceId() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid priceId: " + model.getPriceId());
        }

        // Check if the product exists in the database
        Price price = priceRepository.findById(model.getPriceId()).orElse(null);
        if (price == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found: " + model.getPriceId());
        }

        // Set the visibility of the product
        price.setIsHidden(model.doHide());
        priceRepository.save(price); // Save the product

        return ResponseEntity.ok("Product visibility updated successfully: " + model.getPriceId());
    }
}