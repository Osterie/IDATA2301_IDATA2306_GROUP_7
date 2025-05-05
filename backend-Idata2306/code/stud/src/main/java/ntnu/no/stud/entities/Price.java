package ntnu.no.stud.entities;

import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.ScheduledFlights;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "price")
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private FlightClasses flightClassId;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "currency_code", length = 3, nullable = false)
    private String currencyCode;

    @Column(name = "provider")
    private String provider;

    @Column(name = "discount", nullable = false, columnDefinition = "int default 0")
    private int discount;

    @ManyToOne
    @JoinColumn(name = "scheduled_flights_id", nullable = false)
    private ScheduledFlights scheduledFlight;

    @Column(name = "is_hidden", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isHidden;


    public Price() { }

    public Price(FlightClasses flightClassId, int price, String currencyCode, String provider, int discount, ScheduledFlights scheduledFlight) {
        this.flightClassId = flightClassId;
        this.price = price;
        this.currencyCode = currencyCode;
        this.provider = provider;
        this.discount = discount;
        this.scheduledFlight = scheduledFlight;
        this.isHidden = isHidden;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public FlightClasses getFlightClassId() {
        return flightClassId;
    }

    public void setFlightClassId(FlightClasses flightClassId) {
        this.flightClassId = flightClassId;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public ScheduledFlights getScheduledFlight() {
        return scheduledFlight;
    }

    public void setScheduledFlight(ScheduledFlights scheduledFlight) {
        this.scheduledFlight = scheduledFlight;
    }

    public boolean getIsHidden() {
        return isHidden;
    }

    public void setIsHidden(boolean isHidden) {
        this.isHidden = isHidden;
    }
}
