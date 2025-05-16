package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*") 
public class PriceController {

    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);  // Logger instance

    @Autowired
    private PriceRepository priceRepository;

    // Endpoint to fetch the cheapest flight
    @GetMapping("/cheapest")
    public Price getCheapestFlight() {
        return priceRepository.findCheapestFlight();

    }

    // Endpoint to fetch flights departing today
    @GetMapping("/today")
    public List<Price> getFlightsToday() {
        LocalDate today = LocalDate.now();
        return priceRepository.findRandomFlightByDate(today);
    }

    // Endpoint to fetch flights departing tomorrow
    @GetMapping("/tomorrow")
    public List<Price> getFlightsTomorrow() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return priceRepository.findRandomFlightByDate(tomorrow);
    }

    // Endpoint to fetch random flights
    @GetMapping("/random")
    public List<Price> getRandomFlights() {
        return priceRepository.findRandomFlights();
    }

    // Endpoint to fetch highest discounted flight
    @GetMapping("/highest-discount")
    public List<Price> getHighestDiscountedFlight() {
        return priceRepository.findHighestDiscountFlight();
    }

    // Endpoint to fetch flights based on a list of IDs
    @PostMapping("/getFlightByIds")
    public List<Price> getFlightByIds(@RequestBody List<Integer> ids) {
        return priceRepository.findPricesByIds(ids);
    }
}