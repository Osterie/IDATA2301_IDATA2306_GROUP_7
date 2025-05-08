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
        logger.info("Fetching the cheapest flight");
        return priceRepository.findCheapestFlight();

    }

    // Endpoint to fetch flights departing tomorrow
    @GetMapping("/tomorrow")
    public List<Price> getFlightsTomorrow() {
        logger.info("Fetching flight for tomorrow");
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return priceRepository.findFlightByDate(tomorrow);
    }

    // Endpoint to fetch random flights
    @GetMapping("/random")
    public List<Price> getRandomFlights(@RequestParam int count) {
        logger.info("Fetching {} random flights", count);
        return priceRepository.findRandomFlights(count);
    }
}