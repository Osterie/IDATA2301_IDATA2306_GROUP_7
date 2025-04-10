package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightAccommodation;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import ntnu.no.stud.repositories.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FlightAccommodationInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightAccommodationInitializer.class);

    private final FlightAccommodationRepository flightAccommodationRepository;
    private final FlightRepository flightRepository;
    private final ExtraFeatureRepository extraFeatureRepository;

    @Autowired
    public FlightAccommodationInitializer(FlightAccommodationRepository flightAccommodationRepository,
                                          FlightRepository flightRepository,
                                          ExtraFeatureRepository extraFeatureRepository) {
        this.flightAccommodationRepository = flightAccommodationRepository;
        this.flightRepository = flightRepository;
        this.extraFeatureRepository = extraFeatureRepository;
    }

    public void generateRandomFlightAccommodations() {
        List<Flight> flights = flightRepository.findAllFlights();

        for (Flight flight : flights) {

            // Fetch a random extra feature from the database
            ExtraFeature randomExtraFeature = extraFeatureRepository.findRandomExtraFeature();
            if (randomExtraFeature == null) {
                logger.error("Cannot generate flight accommodations: No extra features available.");
                return;
            }

            // Create and save the flight accommodation
            FlightAccommodation flightAccommodation = new FlightAccommodation(flight, randomExtraFeature);
            flightAccommodationRepository.save(flightAccommodation);

        }

        logger.info("Random flight accommodations generated for all flights.");

    }
}