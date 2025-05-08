package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightAccommodation;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FlightAccommodationInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightAccommodationInitializer.class);

    private final FlightAccommodationRepository flightAccommodationRepository;
    private final ExtraFeatureRepository extraFeatureRepository;

    @Autowired
    public FlightAccommodationInitializer(FlightAccommodationRepository flightAccommodationRepository,
                                          ExtraFeatureRepository extraFeatureRepository) {
        this.flightAccommodationRepository = flightAccommodationRepository;
        this.extraFeatureRepository = extraFeatureRepository;
    }

    public void addRandomAccommodationToFlight(Flight flight) {
        try {
            // Gets a random extra feature from the database
            ExtraFeature randomExtraFeature = extraFeatureRepository.findRandomExtraFeature();
            if (randomExtraFeature == null) {
                logger.error("Cannot add accommodation: No extra features available.");
                throw new RuntimeException("Accommodation addition failed: No extra features available.");
            }

            boolean exists = flightAccommodationRepository.existsByFlightAndExtraFeature(flight, randomExtraFeature);
            if (!exists) {
                // Creates and save the flight accommodation
                FlightAccommodation flightAccommodation = new FlightAccommodation(flight, randomExtraFeature);
                flightAccommodationRepository.save(flightAccommodation);
                }

        } catch (Exception e) {
            logger.error("Error adding accommodation to flight: " + flight.getName(), e);
            throw new RuntimeException("Accommodation addition failed for flight: " + flight.getName(), e);
        }
    }
}