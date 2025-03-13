// package ntnu.no.stud.entities;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Table;
// import jakarta.persistence.Id;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.JoinColumn;

// @Entity
// @Table(name = "route")
// public class Route {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int id;

//     @ManyToOne
//     @JoinColumn(name = "departure_airport_code", nullable = false)
//     private Airport departureAirport;

//     @ManyToOne
//     @JoinColumn(name = "arrival_airport_code", nullable = false)
//     private Airport arrivalAirport;

//     // Getters and setters
// }

