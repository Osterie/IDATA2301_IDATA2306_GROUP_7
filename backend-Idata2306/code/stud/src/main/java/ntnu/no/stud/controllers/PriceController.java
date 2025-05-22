package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * Controller responsible for managing flight prices.
 * Provides endpoints to fetch flight price information.
 */
@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
@Tag(name = "Flight Prices", description = "Endpoints for fetching flight price information")
public class PriceController {

    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);

    @Autowired
    private PriceRepository priceRepository;

    /**
     * Endpoint to retrieve the cheapest flight.
     * This endpoint returns the flight with the lowest price.
     * 
     * @return The cheapest flight as a Price object
     */
    @Operation(summary = "Get the cheapest flight", description = "Returns the single cheapest flight available.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cheapest flight retrieved successfully")
    })
    @GetMapping("/cheapest")
    public Price getCheapestFlight() {
        return priceRepository.findCheapestFlight();
    }

    /**
     * Endpoint to retrieve flights departing today.
     * 
     * @return A list of flights departing today
     */
    @Operation(summary = "Get flights departing today", description = "Returns a list of flights departing on the current date.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Flights departing today retrieved successfully")
    })
    @GetMapping("/today")
    public List<Price> getFlightsToday() {
        LocalDate today = LocalDate.now();
        return priceRepository.findRandomFlightByDate(today);
    }

    /**
     * Endpoint to retrieve flights departing tomorrow.
     * 
     * @return A list of flights departing tomorrow
     */
    @Operation(summary = "Get flights departing tomorrow", description = "Returns a list of flights departing on the next day.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Flights departing tomorrow retrieved successfully")
    })
    @GetMapping("/tomorrow")
    public List<Price> getFlightsTomorrow() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return priceRepository.findRandomFlightByDate(tomorrow);
    }

    /**
     * Endpoint to retrieve random flights.
     * This endpoint returns a list of randomly selected flights.
     * 
     * @return A list of random flights
     */
    @Operation(summary = "Get random flights", description = "Returns a list of randomly selected flights.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Random flights retrieved successfully")
    })
    @GetMapping("/random")
    public List<Price> getRandomFlights() {
        return priceRepository.findRandomFlight();
    }

    /**
     * Endpoint to retrieve flights with the highest discount.
     * 
     * @return A list of flights offering the highest discount
     */
    @Operation(summary = "Get flights with the highest discount", description = "Returns a list of flights offering the highest discount.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Flights with highest discount retrieved successfully")
    })
    @GetMapping("/highest-discount")
    public List<Price> getHighestDiscountedFlight() {
        return priceRepository.findHighestDiscountFlight();
    }

    /**
     * Endpoint to retrieve flights by a list of IDs.
     * 
     * @param ids A list of flight IDs
     * @return A list of flights matching the provided IDs
     */
    @Operation(summary = "Get flights by a list of IDs", description = "Returns a list of flights matching the provided IDs.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Flights retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping("/getFlightByIds")
    public List<Price> getFlightByIds(@RequestBody List<Integer> ids) {
        return priceRepository.findPricesByIds(ids);
    }
}
