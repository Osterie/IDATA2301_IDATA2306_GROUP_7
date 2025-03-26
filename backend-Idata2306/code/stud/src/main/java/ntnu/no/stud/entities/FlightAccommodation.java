

package ntnu.no.stud.entities;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.ExtraFeature;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
// import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.JoinColumn;

// @Entity
// @Table(name = "flight_accommodations")
// public class FlightAccommodation {

//     @Id
//     @ManyToOne
//     @JoinColumn(name = "flight_id", nullable = false)
//     private Flight flight;

//     @ManyToOne
//     @JoinColumn(name = "feature_id", nullable = false)
//     private ExtraFeature feature;

//     // Getters and setters
// }

@Entity
@Table(name = "FlightAccommodation")
public class FlightAccommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "feature_id", nullable = false)
    private ExtraFeature extraFeature;

    public FlightAccommodation() { }

    public FlightAccommodation(Flight flight, ExtraFeature extraFeature) {
        this.flight = flight;
        this.extraFeature = extraFeature;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public ExtraFeature getFeature() {
        return extraFeature;
    }

    public void setFeature(ExtraFeature extraFeature) {
        this.extraFeature = extraFeature;
    }

}
