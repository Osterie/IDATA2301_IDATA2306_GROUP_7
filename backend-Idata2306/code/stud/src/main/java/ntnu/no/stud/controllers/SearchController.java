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
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.Route;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.models.Passenger;
import ntnu.no.stud.repositories.PriceRepository;

/**
 * 
 * A REST API controller which responds to HTTP requests.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class SearchController {

  @Autowired
  private PriceRepository priceRepository; // Inject the repository

//   @PostMapping("/searchForFlights")
//   public List<Flight> searchForFlights(@RequestBody SearchedFlight searchedFlight) {
//     return priceRepository.searchForFlights(searchedFlight);
//   }
  /**
   * Adds a flight to the flight table
   */
  @GetMapping("/searchForFlightsGet")
  public List<Price> searchForFlightsGet() {
    Route route = new Route(new Airport("JFK", "New york"), new Airport("SIN", "Singapore"));
    LocalDate date = LocalDate.parse("2025-04-02");
    
    
    LocalDate fromDate = LocalDate.parse("2025-04-02");
    LocalDate toDate = LocalDate.parse("2025-04-20");
    // List<Passenger> passengers = new ArrayList<>();
    
    ScheduledFlights scheduledFlight = new ScheduledFlights(new Flight("Delta Flight 425", "Delta Air Lines"), route, date);

    return priceRepository.searchForFlights(scheduledFlight, fromDate, toDate);
  }
}