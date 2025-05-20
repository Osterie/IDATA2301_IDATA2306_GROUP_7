package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.Purchase;
import ntnu.no.stud.repositories.PurchaseRepository;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.dto.PurchaseRequest;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

/**
 * Controller responsible for handling purchases.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
@Tag(name = "Purchases", description = "Endpoints for managing flight purchases")
public class PurchaseController {

    private static final Logger logger = LoggerFactory.getLogger(PurchaseController.class);

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private FlightClassesRepository flightClassesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Operation(summary = "Get all purchases for a user",
               description = "Fetch all purchase records associated with the given user ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Purchases retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user ID supplied")
    })
    @GetMapping("/purchases")
    public ResponseEntity<?> getUserPurchases(@RequestParam Long userId) {
        List<Purchase> purchases = purchaseRepository.findAllByUserId(userId);
        return ResponseEntity.ok(purchases);
    }

    @Operation(summary = "Create purchases for flights",
               description = "Create one or more purchase records for the provided purchase requests.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Purchases created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid purchase data provided")
    })
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
