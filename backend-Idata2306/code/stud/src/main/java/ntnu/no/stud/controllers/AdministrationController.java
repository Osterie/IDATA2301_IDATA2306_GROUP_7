package ntnu.no.stud.controllers;

import java.io.IOException;
import java.util.List;

import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.dto.AuthenticationRequest;
import ntnu.no.stud.dto.AuthenticationResponse;
import ntnu.no.stud.dto.SignupDto;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import ntnu.no.stud.models.EditRoleModel;
import ntnu.no.stud.models.EditUsersInRoleModel;
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

    public AdministrationController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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
    
    // [HttpPost]

    // public async Task<IActionResult> EditUser(EditUserViewModel model)
    //     {
    //         //First Fetch the User by Id from the database
    //         ApplicationUser user = await _userManager.FindByIdAsync(model.Id);

    //         //Check if the User Exists in the database
    //         if (user == null)
    //         {
    //             //If the User does not exists in the database, then return Not Found Error View
    //             ViewBag.ErrorMessage = $"User with Id = {model.Id} cannot be found";
    //             return View("NotFound");
    //         }
    //         else
    //         {
    //             //If the User Exists, then proceed and update the data
    //             //Populate the user instance with the data from EditUserViewModel
    //             user.UserName = model.UserName;
    //             // user.Email = model.Email;
    //             // user.FirstName = model.FirstName;
    //             // user.LastName = model.LastName;

    //             //UpdateAsync Method will update the user data in the AspNetUsers Identity table
    //             IdentityResult result = await _userManager.UpdateAsync(user);

    //             if (result.Succeeded)
    //             {
    //                 //Once user data updated redirect to the ListUsers view
    //                 return RedirectToAction("ListUsers");
    //             }
    //             else
    //             {
    //                 //In case any error, stay in the same view and show the model validation error
    //                 foreach (IdentityError error in result.Errors)
    //                 {
    //                     ModelState.AddModelError("", error.Description);
    //                 }
    //                 return View(model);
    //             }
    //         }
    //     }

    // [HttpPost]

    // public async Task<IActionResult> DeleteUser(string UserId)
    //     {
    //         //First Fetch the User you want to Delete
    //         ApplicationUser user = await _userManager.FindByIdAsync(UserId);

    //         if (user == null)
    //         {
    //             // Handle the case where the user wasn't found
    //             ViewBag.ErrorMessage = $"User with Id = {UserId} cannot be found";
    //             return View("NotFound");
    //         }
    //         else
    //         {
    //             //Delete the User Using DeleteAsync Method of UserManager Service
    //             IdentityResult result = await _userManager.DeleteAsync(user);

    //             if (result.Succeeded)
    //             {
    //                 // Handle a successful delete
    //                 return RedirectToAction("ListUsers");
    //             }
    //             else
    //             {
    //                 // Handle failure
    //                 foreach (IdentityError error in result.Errors)
    //                 {
    //                     ModelState.AddModelError("", error.Description);
    //                 }
    //             }

    //             return View("ListUsers");
    //         }
    //     }

    // [HttpPost]

    // public async Task<IActionResult> ManageUserRoles(
    //         List<UserRolesViewModel> model,
    //         string UserId
    //     )
    //     {
    //         ApplicationUser user = await _userManager.FindByIdAsync(UserId);
    //         if (user == null)
    //         {
    //             ViewBag.ErrorMessage = $"User with Id = {UserId} cannot be found";
    //             return View("NotFound");
    //         }

    //         //fetch the list of roles the specified user belongs to
    //         IList<string> roles = await _userManager.GetRolesAsync(user);

    //         //Then remove all the assigned roles for this user
    //         IdentityResult result = await _userManager.RemoveFromRolesAsync(user, roles);

    //         if (!result.Succeeded)
    //         {
    //             ModelState.AddModelError("", "Cannot remove user existing roles");
    //             return View(model);
    //         }

    //         List<string> RolesToBeAssigned = model
    //             .Where(x => x.IsSelected)
    //             .Select(y => y.RoleName)
    //             .ToList();

    //         //If At least 1 Role is assigned, Any Method will return true
    //         if (RolesToBeAssigned.Any())
    //         {
    //             //add a user to multiple roles simultaneously
    //             result = await _userManager.AddToRolesAsync(user, RolesToBeAssigned);
    //             if (!result.Succeeded)
    //             {
    //                 ModelState.AddModelError("", "Cannot Add Selected Roles to User");
    //                 return View(model);
    //             }
    //         }

    //         return RedirectToAction("EditUser", new { UserId = UserId });
    //     }

}