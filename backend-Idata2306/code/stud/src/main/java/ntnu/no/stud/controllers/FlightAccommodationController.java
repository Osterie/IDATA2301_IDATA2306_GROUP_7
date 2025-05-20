package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.FlightAccommodation;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import ntnu.no.stud.repositories.ExtraFeatureRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@Tag(name = "Flight Accommodations", description = "Endpoints for fetching extra features for flights")
public class FlightAccommodationController {

    private static final Logger logger = LoggerFactory.getLogger(FlightAccommodationController.class);

    @Autowired
    private FlightAccommodationRepository flightAccommodationRepository;

    @Autowired
    private ExtraFeatureRepository extraFeatureRepository;

    // If you have a FlightRepository, you may want to inject it to validate flight existence.
    // @Autowired
    // private FlightRepository flightRepository;

    @Operation(summary = "Get extra features for a flight",
               description = "Returns all extra features (accommodations) associated with the specified flight ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Features retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Flight or features not found")
    })
    @GetMapping("/api/flights/{flightId}/extraFeatures")
    public ResponseEntity<?> getExtraFeaturesForFlight(@PathVariable int flightId) {
        logger.info("Request received to fetch extra features for flight ID: {}", flightId);

        // Optionally validate if flight exists using a FlightRepository if you have one
        // Optional<Flight> flightOpt = flightRepository.findById(flightId);
        // if (flightOpt.isEmpty()) {
        //    logger.warn("Flight ID {} not found", flightId);
        //    return new ResponseEntity<>("Flight not found", HttpStatus.NOT_FOUND);
        // }

        // Find all accommodations with the given flight ID
        List<FlightAccommodation> accommodations = ((List<FlightAccommodation>) flightAccommodationRepository.findAll())
            .stream()
            .filter(fa -> fa.getFlight() != null && fa.getFlight().getId() == flightId)
            .collect(Collectors.toList());

        if (accommodations.isEmpty()) {
            logger.warn("No accommodations found for flight ID: {}", flightId);
            return new ResponseEntity<>("No accommodations found for this flight", HttpStatus.NOT_FOUND);
        }

        // Extract extra features from accommodations
        List<ExtraFeature> features = accommodations.stream()
                .map(FlightAccommodation::getFeature)
                .collect(Collectors.toList());

        logger.info("Returning {} features for flight ID: {}", features.size(), flightId);
        return new ResponseEntity<>(features, HttpStatus.OK);
    }
}
