package ntnu.no.stud.dto;

/**
 * Data transfer object (DTO) for submitting changes to user profile data.
 */
public class UserProfileModel {
  private String email;

  /**
   * Constructor for UserProfileDto.
   *
   * @param email the email of the user
   */
  public UserProfileModel(String email) {
    this.email = email;
  }

  /**
   * Default constructor required by JPA.
   */
  public UserProfileModel() {
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
