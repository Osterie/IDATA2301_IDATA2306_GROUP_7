package ntnu.no.stud.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

/**
 * Utility class for handling JWT tokens.
 * Code from https://youtu.be/X80nJ5T7YpE
 */
@Component
public class JwtUtil {
  @Value("${jwt_secret_key}")
  private String secretKey;
  /**
   * Key inside JWT token where roles are stored.
   */
  private static final String ROLE_KEY = "roles";

  /**
   * Key inside JWT token where user id is stored.
   */
  private static final String ID_KEY = "id";

  /**
   * Generate a JWT token for an authenticated user.
   *
   * @param userDetails Object containing user details
   * @return JWT token string
   */
  public String generateToken(UserDetails userDetails) {
    final long timeNow = System.currentTimeMillis();
    final long millisecondsInSevenDays = 7L * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    final long sevendDaysFromNow = timeNow + millisecondsInSevenDays;

    int userId = -1;

    if (userDetails instanceof AccessUserDetails) {
      userId = ((AccessUserDetails) userDetails).getId();
    }

    return Jwts.builder()
        .subject(userDetails.getUsername())
        .claim(ID_KEY, userId)
        .claim(ROLE_KEY, userDetails.getAuthorities())
        .issuedAt(new Date(timeNow))
        .expiration(new Date(sevendDaysFromNow))
        .signWith(getSigningKey())
        .compact();
  }

  private SecretKey getSigningKey() {
    byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
    return new SecretKeySpec(keyBytes, 0, keyBytes.length, "HmacSHA256");
  }

  /**
   * Find username from a JWT token.
   *
   * @param token JWT token
   * @return Username
   */
  public String extractUsername(String token) throws JwtException {
    return extractClaim(token, Claims::getSubject);
  }

  /**
   * Check if a token is valid for a given user.
   *
   * @param token       Token to validate
   * @param userDetails Object containing user details
   * @return True if the token matches the current user and is still valid
   */
  public boolean validateToken(String token, UserDetails userDetails) throws JwtException {
    final String username = extractUsername(token);
    return userDetails != null
        && username.equals(userDetails.getUsername())
        && !isTokenExpired(token);
  }


  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
