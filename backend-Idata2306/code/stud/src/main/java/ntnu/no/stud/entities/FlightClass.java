package ntnu.no.stud.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "flight_classes")
public class FlightClass {

    @Id
    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private FlightClass flightClass;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(name = "available_seats", nullable = false)
    private int availableSeats;

    // Getters and setters
}

