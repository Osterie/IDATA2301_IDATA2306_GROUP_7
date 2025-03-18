package ntnu.no.stud;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.metrics.jfr.FlightRecorderApplicationStartup;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ntnu.no.stud.repositories.FlightRepository;

import ntnu.no.stud.entities.Flight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.entities.Flight;

/**
 * 
 * A REST API controller which responds to HTTP requests for /hello.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class GreetingController {

  @Autowired
  private FlightRepository flightRepository; // Inject the repository

  /**
   * 
   * Responds to HTTP GET requests for /hello.*
   * 
   * @return a greeting message
   */
  @GetMapping("/hello")
  public String greeting() {
    return "Hei, Verden!!";
  }

  /**
   * Adds a flight to the flight table
   */
  @PostMapping("/addFlight")
  public Flight addFlight(@RequestBody Flight flight) {
    return flightRepository.save(flight);
  }

  /**
   * Responds to HTTP GET requests for /flights.
   * 
   * @return all flights in the flight table
   */
  @GetMapping("/flights")
  public Iterable<Flight> getFlights() {
    return flightRepository.findAll();
  }

  // adds a flight with a get mapping
  @GetMapping("/addFlightGet")
  public Flight addFlight() {
    Flight flight = new Flight("SAS123", "SAS");
    return flightRepository.save(flight);
  }
}