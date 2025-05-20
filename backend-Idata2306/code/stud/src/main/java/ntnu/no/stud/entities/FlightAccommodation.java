package ntnu.no.stud.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
@Table(name = "flight_accommodation")
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
