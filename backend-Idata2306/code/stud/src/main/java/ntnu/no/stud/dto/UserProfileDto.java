package ntnu.no.stud.dto;

/**
 * Data transfer object (DTO) for submitting changes to user profile data.
 */
public class UserProfileDto {
  private String email;

  public UserProfileDto(String email) {
    this.email = email;
  }

  public UserProfileDto() {
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
