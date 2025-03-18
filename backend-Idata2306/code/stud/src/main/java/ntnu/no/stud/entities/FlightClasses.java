package ntnu.no.stud.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight_classes")
public class FlightClasses {

    @Id
    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private Class flightClass;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(name = "available_seats", nullable = false)
    private int availableSeats;

    public FlightClasses() { }

    public FlightClasses(Class flightClass, Flight flight, int availableSeats) {
        this.flightClass = flightClass;
        this.flight = flight;
        this.availableSeats = availableSeats;
    }

    // Getters and Setters
    public Class getFlightClass() {
        return flightClass;
    }

    public void setFlightClass(Class flightClass) {
        this.flightClass = flightClass;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}

