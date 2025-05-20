package ntnu.no.stud.dto;

/**
 * Data that the user will send in the login request.
 */
public class AuthenticationRequest {
  private String username;
  private String password;
  private String email;

  public AuthenticationRequest() {
  }

  /**
   * Constructor for AuthenticationRequest.
   *
   * @param username the username of the user
   * @param password the password of the user
   * @param email    the email of the user
   */
  public AuthenticationRequest(String username, String password, String email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  /**
   * Gets the username of the user.
   * 
   * @return the username of the user
   */
  public String getUsername() {
    return username;
  }

  /**
   * Sets the username of the user.
   * 
   * @param username the username of the user
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * Gets the password of the user.
   * 
   * @return the password of the user
   */
  public String getPassword() {
    return password;
  }

  /**
   * Sets the password of the user.
   * 
   * @param password the password of the user
   */
  public void setPassword(String password) {
    this.password = password;
  }

  /**
   * Gets the email of the user.
   * 
   * @return the email of the user
   */
  public String getEmail() {
    return email;
  }

  /**
   * Sets the email of the user.
   * 
   * @param email the email of the user
   */
  public void setEmail(String email) {
    this.email = email;
  }
}
