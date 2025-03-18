package ntnu.no.stud.entities;

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
    private FlightClass flightClassId;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "price_code", length = 3, nullable = false)
    private String priceCode;

    @Column(name = "provider")
    private String provider;

    @Column(name = "discount", nullable = false, columnDefinition = "int default 0")
    private int discount;

    @ManyToOne
    @JoinColumn(name = "scheduled_flights_id", nullable = false)
    private ScheduledFlight scheduledFlight;

    public Price() { }

    public Price(FlightClass flightClassId, int price, String priceCode, String provider, int discount, ScheduledFlight scheduledFlight) {
        this.flightClassId = flightClassId;
        this.price = price;
        this.priceCode = priceCode;
        this.provider = provider;
        this.discount = discount;
        this.scheduledFlight = scheduledFlight;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public FlightClass getFlightClassId() {
        return flightClassId;
    }

    public void setFlightClassId(FlightClass flightClassId) {
        this.flightClassId = flightClassId;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getPriceCode() {
        return priceCode;
    }

    public void setPriceCode(String priceCode) {
        this.priceCode = priceCode;
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

    public ScheduledFlight getScheduledFlight() {
        return scheduledFlight;
    }

    public void setScheduledFlight(ScheduledFlight scheduledFlight) {
        this.scheduledFlight = scheduledFlight;
    }
}
