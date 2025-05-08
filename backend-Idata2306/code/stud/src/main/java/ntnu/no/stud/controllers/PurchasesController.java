package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Purchases;
import ntnu.no.stud.repositories.PurchaseRepository;
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
public class PurchasesController {

    private static final Logger logger = LoggerFactory.getLogger(PurchasesController.class);  // Logger instance

    @Autowired
    private PurchaseRepository purchaseRepository;


    @GetMapping("/api/purchases")
    public ResponseEntity<?> getUserPurchases(@RequestParam Long userId) {
        logger.info("Fetching purchases for user with ID: {}", userId);
        List<Purchases> purchases = purchaseRepository.findAllByUserId(userId);
        
        if (purchases == null || purchases.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No purchases found for user " + userId);
        }
    
        return ResponseEntity.ok(purchases);
    }
}