package ntnu.no.stud.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;

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

    @OneToMany
    @JoinColumn(name = "flight_id", nullable = false)
    private int flightId;

    @OneToMany
    @JoinColumn(name = "feature_id", nullable = false)
    private int featureId;

    // Getters and setters
    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public int getFeatureId() {
        return featureId;
    }

    public void setFeatureId(int featureId) {
        this.featureId = featureId;
    }

}
