package ntnu.no.stud.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.ClassEntity;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.models.Passenger;
import ntnu.no.stud.models.SearchedFlight;
import ntnu.no.stud.repositories.FlightRepository;

/**
 * 
 * A REST API controller which responds to HTTP requests.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class FlightController {

  @Autowired
  private FlightRepository flightRepository; // Inject the repository

//   @PostMapping("/searchForFlights")
//   public List<Flight> searchForFlights(@RequestBody SearchedFlight searchedFlight) {
//     return flightRepository.searchForFlights(searchedFlight);
//   }
  /**
   * Adds a flight to the flight table
   */
  @GetMapping("/searchForFlightsGet")
  public List<Flight> searchForFlightsGet() {
    Route route = new Route(new Airport("OSL", "Oslo"), new Airport("BGO", "Bergen"));
    LocalDate fromDate = LocalDate.now();
    LocalDate toDate = LocalDate.now().plusDays(1);
    List<Passenger> passengers = new ArrayList<>();
    passengers.add(new Passenger(new ClassEntity("Economy"), 1));
    SearchedFlight searchedFlight = new SearchedFlight(route, fromDate, toDate, passengers);

    return flightRepository.searchForFlights(route, fromDate, toDate, passengers);
  }
}