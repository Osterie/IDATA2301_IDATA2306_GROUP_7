// package ntnu.no.stud.entities;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
// import jakarta.persistence.Id;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Column;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.JoinColumn;

// @Entity
// @Table(name = "price")
// public class Price {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int id;

//     @ManyToOne
//     @JoinColumn(name = "class_id", nullable = false)
//     private FlightClass flightClass;

//     @Column(name = "price", nullable = false)
//     private int price;

//     @Column(name = "price_code", length = 3, nullable = false)
//     private String priceCode;

//     @Column(name = "provider")
//     private String provider;

//     @Column(name = "discount", nullable = false)
//     private int discount;

//     @ManyToOne
//     @JoinColumn(name = "scheduled_flights_id", nullable = false)
//     private ScheduledFlight scheduledFlight;

//     // Getters and setters
// }
