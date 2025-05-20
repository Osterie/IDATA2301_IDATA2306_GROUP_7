package ntnu.no.stud.controllers;

import java.util.List;

import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.models.EditRoleModel;
import ntnu.no.stud.models.EditUsersInRoleModel;
import ntnu.no.stud.models.SetProductVisibilityModel;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Controller responsible for administration.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
@Tag(name = "Administration Controller", description = "APIs for user role management and product visibility")
public class AdministrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Operation(summary = "Add role to user", description = "Adds a specified role to the user identified by the user ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Role added successfully"),
        @ApiResponse(responseCode = "400", description = "User already has role"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("api/addRole")
    public ResponseEntity<String> addRole(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Model containing user ID and role to add",
            required = true,
            content = @Content(schema = @Schema(implementation = EditRoleModel.class))
        )
        @RequestBody EditRoleModel model) {

        User user = userRepository.findById(model.getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + model.getId());
        }

        boolean hasRole = user.hasRole(model.getRoleName());
        if (hasRole) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already has role: " + model.getRoleName());
        }

        UserRole role = new UserRole(user, model.getRoleName());
        user.addRole(role);
        userRepository.save(user);

        return ResponseEntity.ok("Role added successfully to user: " + model.getId());
    }

    @Operation(summary = "Remove role from user", description = "Removes a specified role from the user identified by the user ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Role removed successfully"),
        @ApiResponse(responseCode = "400", description = "User does not have the role"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("api/removeRole")
    public ResponseEntity<String> removeRole(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Model containing user ID and role to remove",
            required = true,
            content = @Content(schema = @Schema(implementation = EditRoleModel.class))
        )
        @RequestBody EditRoleModel model) {

        User user = userRepository.findById(model.getId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + model.getId());
        }

        boolean hasRole = user.hasRole(model.getRoleName());
        if (!hasRole) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not have role: " + model.getRoleName());
        }

        UserRole role = new UserRole(user, model.getRoleName());
        user.removeRole(role);
        userRepository.save(user);

        return ResponseEntity.ok("Role removed successfully from user: " + model.getId());
    }

    @Operation(summary = "Edit users in role", description = "Updates roles assigned to multiple users.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Users updated successfully"),
        @ApiResponse(responseCode = "400", description = "Role or users are missing"),
        @ApiResponse(responseCode = "404", description = "One or more users not found")
    })
    @PostMapping("/api/editUsersInRole")
    public ResponseEntity<String> editUsersInRole(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Model containing list of users and the role to update",
            required = true,
            content = @Content(schema = @Schema(implementation = EditUsersInRoleModel.class))
        )
        @RequestBody EditUsersInRoleModel model) {

        List<User> users = model.getUsers();
        UserRole role = model.getRole();

        if (role == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role is required.");
        }
        if (users == null || users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Users are required.");
        }

        for (User user : users) {
            User existingUser = userRepository.findById(user.getId()).orElse(null);
            if (existingUser != null) {
                boolean hasRole = existingUser.hasRole(role.getRole());
                if (!hasRole) {
                    existingUser.addRole(role);
                } else if (hasRole) {
                    existingUser.removeRole(role);
                } else {
                    continue;
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + user.getUsername());
            }
        }

        return ResponseEntity.ok("Users updated successfully.");
    }

    @Operation(summary = "Set flight product visibility", description = "Sets the visibility of a flight product by hiding or showing it.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product visibility updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid priceId"),
        @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PostMapping("/api/setFlightProductVisibility")
    public ResponseEntity<String> setFlightProductVisibility(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Model containing priceId and visibility status",
            required = true,
            content = @Content(schema = @Schema(implementation = SetProductVisibilityModel.class))
        )
        @RequestBody SetProductVisibilityModel model) {

        if (model.getPriceId() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid priceId: " + model.getPriceId());
        }

        Price price = priceRepository.findById(model.getPriceId()).orElse(null);
        if (price == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found: " + model.getPriceId());
        }

        price.setIsHidden(model.doHide());
        priceRepository.save(price);

        return ResponseEntity.ok("Product visibility updated successfully: " + model.getPriceId());
    }

    @Operation(summary = "Get hidden products", description = "Returns all products currently marked as hidden.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of hidden products retrieved",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Price.class)))
    })
    @GetMapping("/api/getHiddenProducts")
    public ResponseEntity<List<Price>> getHiddenProducts() {
        List<Price> hiddenProducts = priceRepository.findByIsHidden(true);
        return ResponseEntity.ok(hiddenProducts);
    }
}
