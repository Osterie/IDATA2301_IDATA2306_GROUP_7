package ntnu.no.stud.controllers;

import java.io.IOException;
import ntnu.no.stud.AccessUserService;
import ntnu.no.stud.dto.AuthenticationRequest;
import ntnu.no.stud.dto.AuthenticationResponse;
import ntnu.no.stud.dto.SignupDto;
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
 * Controller responsible for authentication.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class AuthenticationController {

  private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class); // Logger instance

  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private AccessUserService userService;
  @Autowired
  private JwtUtil jwtUtil;

  /**
   * HTTP POST request to /authenticate.
   *
   * @param authenticationRequest The request JSON object containing username and password
   * @return OK + JWT token; Or UNAUTHORIZED
   */
  @PostMapping("/api/authenticate")
  public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
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

  /**
   * This method processes data received from the sign-up form (HTTP POST).
   *
   * @return Response with status
   */
  @PostMapping("/api/signup")
  public ResponseEntity<String> signupProcess(@RequestBody SignupDto signupData) {
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
