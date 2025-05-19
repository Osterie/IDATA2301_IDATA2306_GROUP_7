package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Purchase;
import ntnu.no.stud.models.PurchaseRequest;
import ntnu.no.stud.repositories.PurchaseRepository;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;

import java.util.List;


/**
 * Controller responsible for handling purchases.
 */
@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/api")
public class PurchaseController {

    private static final Logger logger = LoggerFactory.getLogger(PurchaseController.class);  // Logger instance

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private FlightClassesRepository flightClassesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PriceRepository priceRepository;


    @GetMapping("/purchases")
    public ResponseEntity<?> getUserPurchases(@RequestParam Long userId) {
        logger.info("Fetching purchases for user with ID: {}", userId);
        List<Purchase> purchases = purchaseRepository.findAllByUserId(userId);
    
        return ResponseEntity.ok(purchases);
    }

    @PostMapping("/purchaseFlights")
    public ResponseEntity<?> purchaseFlights(@RequestBody List<PurchaseRequest> purchaseRequests) {


        if (purchaseRequests == null || purchaseRequests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No purchase data provided.");
        }

        for (PurchaseRequest purchaseRequest : purchaseRequests) {
            if (purchaseRequest.getPriceId() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid price ID: " + purchaseRequest.getPriceId());
            }
            if (purchaseRequest.getUserId() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID: " + purchaseRequest.getUserId());
            }
            User user = userRepository.findById(purchaseRequest.getUserId()).orElse(null);
            Price price = priceRepository.findById(purchaseRequest.getPriceId()).orElse(null);

            Purchase purchase = new Purchase(user, price, LocalDate.now());

            Purchase savedPurchase = purchaseRepository.save(purchase);
            
            flightClassesRepository.removeAvaliableSeat(savedPurchase.getPrice().getFlightClassId().getId());
        }

    return ResponseEntity.ok("Purchases created successfully.");
    }
}