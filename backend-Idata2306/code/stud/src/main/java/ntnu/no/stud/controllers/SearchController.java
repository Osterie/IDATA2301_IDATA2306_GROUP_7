package ntnu.no.stud.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ntnu.no.stud.dto.Passenger;
import ntnu.no.stud.dto.SearchedFlight;
import ntnu.no.stud.entities.Airport;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * A REST API controller which responds to HTTP requests.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
@Tag(name = "Flight Search", description = "Endpoints to search flights and get airports")
public class SearchController {

  @Autowired
  private PriceRepository priceRepository;

  @Autowired
  private AirportRepository airportRepository;

  /**
   * Searches for flights based on the provided search criteria.
   *
   * @param searchedFlight The search criteria including departure, arrival, date
   *                       range, and passengers.
   * @return A list of matching flight prices.
   */
  @Operation(summary = "Search for flights", description = "Search flights based on departure, arrival, date range, and passengers details.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "List of matching flights returned")
  })
  @PostMapping("/api/searchForFlights")
  public List<Price> searchForFlights(@RequestBody SearchedFlight searchedFlight) {
    String departure = searchedFlight.getDeparture();
    String arrival = searchedFlight.getArrival();
    LocalDate fromDate = searchedFlight.getFromDate();
    LocalDate toDate = searchedFlight.getToDate();
    List<Passenger> passengers = searchedFlight.getPassengers();

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
          if (availableSeats == 0) {
            return false; // No available seats
          }
          return required != null && availableSeats >= required && required > 0;
        })
        .toList();
  }

  /**
   * Retrieves a list of all airport codes and cities used to search for flights.
   *
   * @return An iterable collection of Airport search terms.
   */
  @Operation(summary = "Get list of airports", description = "Retrieve all airports used in flight searches.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "List of airports returned")
  })
  @GetMapping("/api/getSearchTerms")
  public Iterable<Airport> getAirports() {
    return airportRepository.findAll();
  }
}
