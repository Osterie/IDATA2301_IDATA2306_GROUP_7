package ntnu.no.stud.dto;

/**
 * Data transfer object (DTO) for data from the sign-up form.
 */
public class SignupDto {
  private final String username;
  private final String password;
  private final String email;

  public SignupDto(String username, String password, String email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public String getEmail() {
    return email;
  }
}
