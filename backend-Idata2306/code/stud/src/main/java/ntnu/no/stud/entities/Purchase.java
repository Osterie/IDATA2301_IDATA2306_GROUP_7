package ntnu.no.stud.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * Represents a purchase made by a user.
 * Each purchase is linked to a specific user and a specific price entity.
 */
@Entity
@Table(name = "purchase")
public class Purchase {

    /**
     * The unique identifier for the purchase.
     * Automatically generated by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    /**
     * The user who made the purchase.
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    /**
     * The date when the purchase was made.
     */
    @Column(name = "date", nullable = false)
    private LocalDate date;

    /**
     * The purchased price (flight offer).
     */
    @ManyToOne
    @JoinColumn(name = "price_id", nullable = false)
    private Price price;

    public Purchase() {
    }

    /**
     * Constructs a Purchase with the specified user, price, and date.
     *
     * @param user  The user who made the purchase.
     * @param price The purchased price (flight offer).
     * @param date  The date when the purchase was made.
     */
    public Purchase(User user, Price price, LocalDate date) {
        this.user = user;
        this.price = price;
        this.date = date;
    }

    /**
     * Returns the unique identifier of the purchase.
     *
     * @return the purchase ID
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the purchase.
     *
     * @param id the ID to assign
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Returns the user who made the purchase.
     *
     * @return the user
     */
    public User getUser() {
        return user;
    }

    /**
     * Sets the user who made the purchase.
     *
     * @param user the user to associate with this purchase
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Returns the date when the purchase was made.
     *
     * @return the purchase date
     */
    public LocalDate getDate() {
        return date;
    }

    /**
     * Sets the date when the purchase was made.
     *
     * @param date the date to assign
     */
    public void setDate(LocalDate date) {
        this.date = date;
    }

    /**
     * Returns the purchased price (flight offer).
     *
     * @return the purchased price
     */
    public Price getPrice() {
        return price;
    }

    /**
     * Sets the purchased price (flight offer).
     *
     * @param price the price to associate with this purchase
     */
    public void setPrice(Price price) {
        this.price = price;
    }
}
