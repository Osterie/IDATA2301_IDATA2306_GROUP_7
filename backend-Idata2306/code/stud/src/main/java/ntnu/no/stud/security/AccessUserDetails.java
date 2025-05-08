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

  private void convertRoles(Set<UserRole> roles) {
    authorities.clear();
    for (UserRole role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getRole()));
    }
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public int getId() {
    return id;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return isActive;
  }

  @Override
  public boolean isAccountNonLocked() {
    return isActive;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return isActive;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
