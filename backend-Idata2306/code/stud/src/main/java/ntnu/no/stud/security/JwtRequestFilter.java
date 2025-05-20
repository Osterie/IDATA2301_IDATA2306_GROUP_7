package ntnu.no.stud.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * A filter that is applied to all HTTP requests and checks for a valid JWT
 * token in
 * the `Authorization: Bearer ...` header.
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
  private static final Logger logger = LoggerFactory.getLogger(
      JwtRequestFilter.class.getSimpleName());

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtUtil jwtUtil;

  /**
   * Filter the request and check for a valid JWT token.
   *
   * @param request     The HTTP request
   * @param response    The HTTP response
   * @param filterChain The filter chain
   * @throws ServletException If an error occurs during filtering
   * @throws IOException      If an I/O error occurs
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    String jwtToken = getJwtToken(request);

    String username = jwtToken != null ? getUsernameFrom(jwtToken) : null;

    if (username != null && notAuthenticatedYet()) {
      UserDetails userDetails = getUserDetailsFromDatabase(username);
      if (userDetails == null) {
        logger.warn("User details not found for username: " + username);
      } else if (jwtUtil.validateToken(jwtToken, userDetails)) {
        registerUserAsAuthenticated(request, userDetails);
      } else {
        logger.warn("JWT token is invalid for user: " + username);
      }
    }

    filterChain.doFilter(request, response);
  }

  /**
   * Get the user details from the database.
   *
   * @param username The username of the user
   * @return The user details
   */
  private UserDetails getUserDetailsFromDatabase(String username) {
    UserDetails userDetails = null;
    try {
      userDetails = userDetailsService.loadUserByUsername(username);
    } catch (UsernameNotFoundException e) {
      logger.warn("User " + username + " not found in the database");
    }
    return userDetails;
  }

  /**
   * Get the JWT token from the request.
   *
   * @param request The HTTP request
   * @return The JWT token
   */
  private String getJwtToken(HttpServletRequest request) {
    final String authorizationHeader = request.getHeader("Authorization");
    String jwt = null;
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = stripBearerPrefixFrom(authorizationHeader);
    }
    return jwt;
  }

  /**
   * Strip the "Bearer " prefix from the Header "Authorization: Bearer ...
   *
   * @param authorizationHeaderValue The value of the Authorization HTTP header
   * @return The JWT token following the "Bearer " prefix
   */
  private static String stripBearerPrefixFrom(String authorizationHeaderValue) {
    final int numberOfCharsToStrip = "Bearer ".length();
    return authorizationHeaderValue.substring(numberOfCharsToStrip);
  }

  /**
   * Get the username from the JWT token.
   *
   * @param jwtToken The JWT token
   * @return The username
   */
  private String getUsernameFrom(String jwtToken) {
    String username = null;
    try {
      username = jwtUtil.extractUsername(jwtToken);
    } catch (MalformedJwtException e) {
      logger.warn("Malformed JWT: " + e.getMessage());
    } catch (JwtException e) {
      logger.warn("Error in the JWT token: " + e.getMessage());
    }
    return username;
  }

  /**
   * Check if the user is not authenticated yet.
   *
   * @return true if the user is not authenticated, false otherwise
   */
  private static boolean notAuthenticatedYet() {
    return SecurityContextHolder.getContext().getAuthentication() == null;
  }

  /**
   * Register the user as authenticated.
   *
   * @param request      The HTTP request
   * @param userDetails  The user details
   */
  private static void registerUserAsAuthenticated(HttpServletRequest request,
      UserDetails userDetails) {
    final UsernamePasswordAuthenticationToken upat = new UsernamePasswordAuthenticationToken(
        userDetails, null, userDetails.getAuthorities());
    upat.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(upat);
  }
}
