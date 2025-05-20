package ntnu.no.stud.security;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.entities.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Contains authentication information, needed by UserDetailsService.
 */
public class AccessUserDetails implements UserDetails {
  private final int id;
  private final String username;
  private final String password;
  private final String email;
  private final boolean isActive;
  private final List<GrantedAuthority> authorities = new LinkedList<>();

  /**
   * Create access object.
   *
   * @param user The user to copy data from
   */
  public AccessUserDetails(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.email = user.getEmail();
    this.isActive = user.isActive();
    this.convertRoles(user.getRoles());
  }

  /**
   * Convert roles to authorities.
   * 
   * @param roles The roles to convert to authorities
   */
  private void convertRoles(Set<UserRole> roles) {
    authorities.clear();
    for (UserRole role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getRole()));
    }
  }

  /**
   * Get the authorities of the user.
   * 
   * @return The authorities of the user
   */
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  /**
   * Get the ID of the user.
   * 
   * @return The ID of the user
   */
  public int getId() {
    return id;
  }

  /**
   * Get the password of the user.
   * 
   * @return The password of the user
   */
  @Override
  public String getPassword() {
    return password;
  }

  /**
   * Get the username of the user.
   * 
   * @return The username of the user
   */
  @Override
  public String getUsername() {
    return username;
  }

  /**
   * Get the email of the user.
   * 
   * @return The email of the user
   */
  public String getEmail() {
    return email;
  }

  /**
   * Get the active status of the user.
   * 
   * @return The active status of the user
   */
  @Override
  public boolean isAccountNonExpired() {
    return isActive;
  }

  /**
   * Get the active status of the user.
   * 
   * @return The active status of the user
   */
  @Override
  public boolean isAccountNonLocked() {
    return isActive;
  }

  /**
   * Get the active status of the user.
   * 
   * @return The active status of the user
   */
  @Override
  public boolean isCredentialsNonExpired() {
    return isActive;
  }

  /**
   * Get the active status of the user.
   * 
   * @return The active status of the user
   */
  @Override
  public boolean isEnabled() {
    return true;
  }
}
