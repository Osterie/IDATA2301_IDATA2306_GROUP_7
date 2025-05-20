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

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
@Tag(name = "Flight Prices", description = "Endpoints for fetching flight price information")
public class PriceController {

    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);

    @Autowired
    private PriceRepository priceRepository;

    @Operation(summary = "Get the cheapest flight",
               description = "Returns the single cheapest flight available.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cheapest flight retrieved successfully")
    })
    @GetMapping("/cheapest")
    public Price getCheapestFlight() {
        return priceRepository.findCheapestFlight();
    }

    @Operation(summary = "Get flights departing today",
               description = "Returns a list of flights departing on the current date.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Flights departing today retrieved successfully")
    })
    @GetMapping("/today")
    public List<Price> getFlightsToday() {
        LocalDate today = LocalDate.now();
        return priceRepository.findRandomFlightByDate(today);
    }

    @Operation(summary = "Get flights departing tomorrow",
               description = "Returns a list of flights departing on the next day.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Flights departing tomorrow retrieved successfully")
    })
    @GetMapping("/tomorrow")
    public List<Price> getFlightsTomorrow() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return priceRepository.findRandomFlightByDate(tomorrow);
    }

    @Operation(summary = "Get random flights",
               description = "Returns a list of randomly selected flights.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Random flights retrieved successfully")
    })
    @GetMapping("/random")
    public List<Price> getRandomFlights() {
        return priceRepository.findRandomFlight();
    }

    @Operation(summary = "Get flights with the highest discount",
               description = "Returns a list of flights offering the highest discount.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Flights with highest discount retrieved successfully")
    })
    @GetMapping("/highest-discount")
    public List<Price> getHighestDiscountedFlight() {
        return priceRepository.findHighestDiscountFlight();
    }

    @Operation(summary = "Get flights by a list of IDs",
               description = "Returns a list of flights matching the provided IDs.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Flights retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping("/getFlightByIds")
    public List<Price> getFlightByIds(@RequestBody List<Integer> ids) {
        return priceRepository.findPricesByIds(ids);
    }
}
