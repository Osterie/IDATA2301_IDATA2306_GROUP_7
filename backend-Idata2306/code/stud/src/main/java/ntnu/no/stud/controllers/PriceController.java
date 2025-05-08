package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*") 
public class PriceController {

    private static final Logger logger = LoggerFactory.getLogger(PriceController.class);  // Logger instance

    @Autowired
    private PriceRepository priceRepository;

    // Endpoint to fetch the cheapest flight
    @PostMapping("/cheapest")
    public Price getCheapestFlight() {
        logger.info("Fetching the cheapest flight");
        return priceRepository.findCheapestFlight();

    }

    // Endpoint to fetch flights departing tomorrow
    @PostMapping("/tomorrow")
    public List<Price> getFlightsTomorrow() {
        logger.info("Fetching flight for tomorrow");
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        return priceRepository.findFlightByDate(tomorrow);
    }

    // Endpoint to fetch random flights
    @PostMapping("/random")
    public List<Price> getRandomFlights(@RequestBody Map<String, Integer> request) {
        int count = request.get("count");
        logger.info("Fetching {} random flights", count);
        return priceRepository.findRandomFlights(count);
    }
}