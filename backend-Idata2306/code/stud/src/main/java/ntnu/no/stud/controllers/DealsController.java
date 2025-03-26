package ntnu.no.stud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ntnu.no.stud.entities.Price;
import java.util.List;

import ntnu.no.stud.repositories.PriceRepository;


/**
 * 
 * A REST API controller which responds to HTTP requests.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class DealsController {
    
    @Autowired
     private PriceRepository priceRepository; // Inject the repository

    @GetMapping("/getDeals")
    public List<Price> getDeals(int count) {
        return priceRepository.findRandomFlights(count);
    }


}
