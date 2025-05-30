package ntnu.no.stud.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Represents a flight route between two airports: a departure airport and an
 * arrival airport.
 * This entity maps to the {@code route} table in the database.
 */
@Entity
@Table(name = "route")
public class Route {

    /**
     * The unique identifier for the route.
     * Automatically generated by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * The airport from which the flight departs.
     */
    @ManyToOne
    @JoinColumn(name = "departure_airport_code", nullable = false)
    private Airport departureAirport;

    /**
     * The airport at which the flight arrives.
     */
    @ManyToOne
    @JoinColumn(name = "arrival_airport_code", nullable = false)
    private Airport arrivalAirport;

    /**
     * Default constructor required by JPA.
     */
    public Route() {
    }

    /**
     * Constructs a new {@code Route} with the specified departure and arrival
     * airports.
     *
     * @param departureAirport the airport from which the flight departs
     * @param arrivalAirport   the airport at which the flight arrives
     */
    public Route(Airport departureAirport, Airport arrivalAirport) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
    }

    /**
     * Returns the unique ID of the route.
     *
     * @return the route ID
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the unique ID of the route.
     *
     * @param id the route ID to set
     */
    public void setd(int id) {
        this.id = id;
    }

    /**
     * Returns the departure airport.
     *
     * @return the departure {@link Airport}
     */
    public Airport getDepartureAirport() {
        return departureAirport;
    }

    /**
     * Sets the departure airport.
     *
     * @param departureAirport the {@link Airport} from which the flight departs
     */
    public void setDepartureAirport(Airport departureAirport) {
        this.departureAirport = departureAirport;
    }

    /**
     * Returns the arrival airport.
     *
     * @return the arrival {@link Airport}
     */
    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    /**
     * Sets the arrival airport.
     *
     * @param arrivalAirport the {@link Airport} at which the flight arrives
     */
    public void setArrivalAirport(Airport arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }
}
