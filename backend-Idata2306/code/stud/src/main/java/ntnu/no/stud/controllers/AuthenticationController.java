package ntnu.no.stud.controllers;

import java.io.IOException;
import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.dto.AuthenticationRequest;
import ntnu.no.stud.dto.AuthenticationResponse;
import ntnu.no.stud.dto.SignupModel;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Controller responsible for authentication.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
@Tag(name = "Authentication Controller", description = "Endpoints for user authentication and signup")
public class AuthenticationController {

  private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private AccessUserService userService;

  @Autowired
  private JwtUtil jwtUtil;

  @Operation(summary = "Authenticate user and get JWT token",
             description = "Validates user credentials and returns a JWT token if successful.")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Authentication successful",
      content = @Content(schema = @Schema(implementation = AuthenticationResponse.class))),
    @ApiResponse(responseCode = "401", description = "Invalid username or password",
      content = @Content)
  })
  @PostMapping("/api/authenticate")
  public ResponseEntity<?> authenticate(
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
      description = "Authentication request with username and password",
      required = true,
      content = @Content(schema = @Schema(implementation = AuthenticationRequest.class))
    )
    @RequestBody AuthenticationRequest authenticationRequest) {
    
    logger.info("Authentication attempt for user: {}", authenticationRequest.getUsername());

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
          authenticationRequest.getUsername(),
          authenticationRequest.getPassword()));
    } catch (BadCredentialsException e) {
      logger.warn("Authentication failed for user: {}", authenticationRequest.getUsername());
      return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }

    final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
    final String jwt = jwtUtil.generateToken(userDetails);

    logger.info("Authentication successful for user: {}", authenticationRequest.getUsername());
    return ResponseEntity.ok(new AuthenticationResponse(jwt));
  }

  @Operation(summary = "Sign up new user",
             description = "Creates a new user account with username, password, and email.")
  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "User created successfully"),
    @ApiResponse(responseCode = "400", description = "User creation failed due to invalid data or IO error",
      content = @Content)
  })
  @PostMapping("/api/signup")
  public ResponseEntity<String> signupProcess(
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
      description = "Sign-up data including username, password and email",
      required = true,
      content = @Content(schema = @Schema(implementation = SignupModel.class))
    )
    @RequestBody SignupModel signupData) {
    
    logger.info("Sign-up attempt for username: {}", signupData.getUsername());

    ResponseEntity<String> response;
    try {
      userService.tryCreateNewUser(signupData.getUsername(), signupData.getPassword(), signupData.getEmail());
      logger.info("User successfully created: {}", signupData.getUsername());
      response = new ResponseEntity<>(HttpStatus.OK);
    } catch (IOException e) {
      logger.error("Error creating user: {}", signupData.getUsername(), e);
      response = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
    return response;
  }
}
