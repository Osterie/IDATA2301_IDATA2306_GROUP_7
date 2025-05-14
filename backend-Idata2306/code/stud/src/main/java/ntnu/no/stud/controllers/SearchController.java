package ntnu.no.stud.controllers;

import java.time.LocalDate;
import java.util.List;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.models.SearchedFlight;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * A REST API controller which responds to HTTP requests.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class SearchController {

  @Autowired
  private PriceRepository priceRepository; // Inject the repository

  @PostMapping("/api/searchForFlights")
  public List<Price> searchForFlights(@RequestBody SearchedFlight searchedFlight) {

    // ScheduledFlights scheduledFlight = searchedFlight.getScheduledFlights();

    String departure = searchedFlight.getDeparture();
    String arrival = searchedFlight.getArrival();
    LocalDate fromDate = searchedFlight.getFromDate();
    LocalDate toDate = searchedFlight.getToDate();

    return priceRepository.searchForFlights(departure, arrival, fromDate, toDate);
  }


  // @GetMapping("/api/getSearchTerms")
  // public List<String> getSearchTerms() {
  //   return priceRepository.getSearchTerms();
  // }

  /**
   * Adds a flight to the flight table
   */
  // @GetMapping("/searchForFlightsGet")
  // public List<Price> searchForFlightsGet() {
  //   Route route = new Route(new Airport("JFK", "New york"), new Airport("SIN", "Singapore"));
  //   LocalDate date = LocalDate.parse("2025-04-02");
    
    
  //   LocalDate fromDate = LocalDate.parse("2025-04-02");
  //   LocalDate toDate = LocalDate.parse("2025-04-20");
  //   // List<Passenger> passengers = new ArrayList<>();
    
  //   ScheduledFlights scheduledFlight = new ScheduledFlights(new Flight("Delta Flight 425", "Delta Air Lines"), route, date);

  //   // return priceRepository.searchForFlights(scheduledFlight, fromDate, toDate);
  // }
}