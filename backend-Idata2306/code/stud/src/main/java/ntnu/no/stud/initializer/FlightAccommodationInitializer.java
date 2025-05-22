package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.ExtraFeature;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.entities.FlightAccommodation;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.FlightAccommodationRepository;
import ntnu.no.stud.repositories.FlightRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class FlightAccommodationInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightAccommodationInitializer.class);

    private final FlightAccommodationRepository flightAccommodationRepository;
    private final ExtraFeatureRepository extraFeatureRepository;

    @Autowired
    private FlightRepository flightRepository;

    public FlightAccommodationInitializer(FlightAccommodationRepository flightAccommodationRepository,
                                          ExtraFeatureRepository extraFeatureRepository) {
        this.flightAccommodationRepository = flightAccommodationRepository;
        this.extraFeatureRepository = extraFeatureRepository;
    }

    public void addRandomAccommodationforFlights() {
        Iterable<Flight> allFlights = flightRepository.findAll();
        Iterable<ExtraFeature> iterable = extraFeatureRepository.findAll();
        List<ExtraFeature> allExtraFeatures = new ArrayList<>();
        iterable.forEach(allExtraFeatures::add);

        for (Flight flight : allFlights) {
            try {
                // Randomly pick 3 unique features
                List<ExtraFeature> selectedFeatures = getRandomUniqueFeatures(allExtraFeatures, 3);

                for (ExtraFeature feature : selectedFeatures) {
                    boolean exists = flightAccommodationRepository.existsByFlightAndExtraFeature(flight, feature);
                    if (!exists) {
                        FlightAccommodation accommodation = new FlightAccommodation(flight, feature);
                        flightAccommodationRepository.save(accommodation);
                    }
                }

            } catch (Exception e) {
                logger.error("Error adding accommodations to flight: " + flight.getName(), e);
                throw new RuntimeException("Accommodation addition failed for flight: " + flight.getName(), e);
            }
        }
            logger.info("Flight accommodations generated successfully.");
    }

    private List<ExtraFeature> getRandomUniqueFeatures(List<ExtraFeature> features, int count) {
        Collections.shuffle(features);
        return features.subList(0, Math.min(count, features.size()));
    }
}