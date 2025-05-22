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

import io.jsonwebtoken.lang.Collections;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

/**
 * Controller responsible for managing flight accommodations.
 */
@RestController
@CrossOrigin(origins = "*")
@Tag(name = "Flight Accommodations", description = "Endpoints for fetching extra features for flights")
public class FlightAccommodationController {

    private static final Logger logger = LoggerFactory.getLogger(FlightAccommodationController.class);

    @Autowired
    private FlightAccommodationRepository flightAccommodationRepository;

    /**
     * Fetches extra features (accommodations) for a specific flight.
     * 
     * @param flightId The ID of the flight for which to fetch extra features.
     * @return A ResponseEntity containing a list of FlightAccommodation objects.
     */
    @Operation(summary = "Get extra features for a flight", description = "Returns all extra features (accommodations) associated with the specified flight ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Features retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Flight or features not found")
    })
    @GetMapping("/api/flights/accommodations/{flightId}")
    public ResponseEntity<List<FlightAccommodation>> getExtraFeaturesForFlight(@PathVariable int flightId) {
        logger.info("Request received to fetch extra features for flight ID: {}", flightId);

        List<FlightAccommodation> accommodations = flightAccommodationRepository.findByFlightId(flightId);

        return ResponseEntity.ok(accommodations);
    }
}