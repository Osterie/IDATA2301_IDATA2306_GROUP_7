package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class PurchasesController {

    private static final Logger logger = LoggerFactory.getLogger(PurchasesController.class);  // Logger instance

    @Autowired
    private PurchaseRepository purchaseRepository;

    // Endpoint to fetch the users purchases
    @GetMapping("/purchases/{userId}")
    public Purchases getUserPurchases(@RequestParam Long userId){
        logger.info("Fetching purchases for user with ID: {}", userId);
        return purchaseRepository.findPurchasesByUserId(userId);
    }
}