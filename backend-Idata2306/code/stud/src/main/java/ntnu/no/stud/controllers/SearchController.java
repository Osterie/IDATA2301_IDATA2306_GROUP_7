package ntnu.no.stud.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.models.Passenger;
import ntnu.no.stud.models.SearchedFlight;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

  @Autowired
  private AirportRepository airportRepository; // Inject the repository

  @PostMapping("/api/searchForFlights")
  public List<Price> searchForFlights(@RequestBody SearchedFlight searchedFlight) {

    // ScheduledFlights scheduledFlight = searchedFlight.getScheduledFlights();

    String departure = searchedFlight.getDeparture();
    String arrival = searchedFlight.getArrival();
    LocalDate fromDate = searchedFlight.getFromDate();
    LocalDate toDate = searchedFlight.getToDate();
    List<Passenger> passengers = searchedFlight.getPassengers();

    // return priceRepository.searchForFlights(departure, arrival, fromDate,
    // toDate);
    // Flights matching departure, arrival, and date
    List<Price> allMatchingPrices = priceRepository.searchForFlights(departure, arrival, fromDate, toDate);

    // Required seats per class name
    Map<String, Integer> requiredSeatsPerClass = new HashMap<>();
    for (Passenger passenger : passengers) {
      String className = passenger.getClassType().getName();
      int amount = passenger.getAmount();
      requiredSeatsPerClass.merge(className, amount, Integer::sum);
    }

    return allMatchingPrices.stream()
        .filter(price -> {
          String className = price.getFlightClassId().getFlightClass().getName();
          int availableSeats = price.getFlightClassId().getAvailableSeats();
          Integer required = requiredSeatsPerClass.get(className);
          return required != null && availableSeats >= required && required > 0 ;
        })
        .toList();
  }

  @GetMapping("/api/getSearchTerms")
  public Iterable<Airport> getAirports() {
    return airportRepository.findAll();
  }
}