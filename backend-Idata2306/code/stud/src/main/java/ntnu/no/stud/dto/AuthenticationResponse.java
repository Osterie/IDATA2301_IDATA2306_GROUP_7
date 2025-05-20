package ntnu.no.stud.dto;

/**
 * Data that we will send as a response to the user when the authentication is successful.
 */
public class AuthenticationResponse {
  private final String jwt;

  /**
   * Constructor for AuthenticationResponse.
   *
   * @param jwt the JWT token
   */
  public AuthenticationResponse(String jwt) {
    this.jwt = jwt;
  }

  /**
   * Gets the JWT token.
   * 
   * @return the JWT token
   */
  public String getJwt() {
    return jwt;
  }
}
