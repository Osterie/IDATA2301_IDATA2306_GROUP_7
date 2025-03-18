package ntnu.no.stud.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "airport")
public class Airport {

    @Id
    @Column(name = "airport_code", length = 3)
    private String airportCode;

    @Column(name = "city", nullable = false)
    private String city;

    public Airport() { }

    public Airport(String airportCode, String city) {
        this.airportCode = airportCode;
        this.city = city;
    }

    // Getters and Setters
    public String getAirportCode() {
        return airportCode;
    }

    public void setAirportCode(String airportCode) {
        this.airportCode = airportCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
