package ntnu.no.stud.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_roles")
public class UserRoles {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "role", nullable = false)
    private String role;
    

    public UserRoles() { }

    public UserRoles(String userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
