package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Purchase;
import ntnu.no.stud.repositories.PurchaseRepository;
import ntnu.no.stud.repositories.FlightClassesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


/**
 * Controller responsible for handling purchases.
 */
@RestController
@CrossOrigin(origins = "*") 
public class PurchaseController {

    private static final Logger logger = LoggerFactory.getLogger(PurchaseController.class);  // Logger instance

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private FlightClassesRepository flightClassesRepository;


    @GetMapping("/api/purchases")
    public ResponseEntity<?> getUserPurchases(@RequestParam Long userId) {
        logger.info("Fetching purchases for user with ID: {}", userId);
        List<Purchase> purchases = purchaseRepository.findAllByUserId(userId);
        
        if (purchases == null || purchases.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No purchases found for user " + userId);
        }
    
        return ResponseEntity.ok(purchases);
    }

    @PostMapping("/api/purchaseFlights")
    public ResponseEntity<?> createPurchaseFlights(@RequestBody List<Purchase> purchases) {
        logger.info("Creating purchase flights: {}", purchases);    
        logger.info("Creating purchase flights: {}", purchases);   
        logger.info("Creating purchase flights: {}", purchases);   
        logger.info("Creating purchase flights: {}", purchases);   

        if (purchases == null || purchases.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No purchase data provided.");
        }

        for (Purchase purchase : purchases) {

            Purchase savedPurchase = purchaseRepository.save(purchase);
            if (savedPurchase == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save purchase: " + purchase);
            }
            flightClassesRepository.removeAvaliableSeat(savedPurchase.getPrice().getId());


        }

        return ResponseEntity.ok("Purchases created successfully.");
    }
}