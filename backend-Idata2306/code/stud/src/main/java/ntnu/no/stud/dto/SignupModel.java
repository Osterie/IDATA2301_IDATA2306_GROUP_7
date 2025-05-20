package ntnu.no.stud.dto;

/**
 * Data transfer object (DTO) for data from the sign-up form.
 */
public class SignupModel {
  private final String username;
  private final String password;
  private final String email;

  /**
   * Default constructor required by JPA.
   * 
   * @param username the username of the user
   * @param password the password of the user
   * @param email   the email of the user
   */
  public SignupModel(String username, String password, String email) {
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
   * Gets the password of the user.
   * 
   * @return the password of the user
   */
  public String getPassword() {
    return password;
  }

  /**
   * Gets the email of the user.
   * 
   * @return the email of the user
   */
  public String getEmail() {
    return email;
  }
}
