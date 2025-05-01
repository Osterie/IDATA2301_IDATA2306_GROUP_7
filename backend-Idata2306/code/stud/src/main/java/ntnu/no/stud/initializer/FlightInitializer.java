package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.repositories.RouteRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class FlightInitializer {

    private static final Logger logger = LoggerFactory.getLogger(FlightInitializer.class);

    @Autowired
    private ScheduledFlightsInitializer scheduledFlightsInitializer;

    @Autowired
    private FlightClassesInitializer flightClassInitializer;

    @Autowired
    private FlightAccommodationInitializer flightAccommodationInitializer;

    private final FlightRepository flightRepository;

    @Autowired
    public FlightInitializer(FlightRepository flightRepository, RouteRepository routeRepository) {
        this.flightRepository = flightRepository;
    }

    public void generateRandomFlights(int numberOfFlights) {
        try {
            // Define a mapping between airlines and their prefixes
            Map<String, String> airlinePrefixes = new HashMap<>();
            airlinePrefixes.put("American Airlines", "AA");
            airlinePrefixes.put("Delta Air Lines", "Delta");
            airlinePrefixes.put("Lufthansa", "LH");
            airlinePrefixes.put("Emirates", "EK");
            airlinePrefixes.put("Qatar Airways", "QR");
            airlinePrefixes.put("Singapore Airlines", "SQ");
            airlinePrefixes.put("Air France", "AF");
            airlinePrefixes.put("KLM Royal Dutch Airlines", "KLM");
            airlinePrefixes.put("Norwegian Air Shuttle", "Norwegian");
            airlinePrefixes.put("Alitalia", "Alitalia");
            airlinePrefixes.put("Swiss International Air Lines", "Swiss");
    
            for (int i = 0; i < numberOfFlights; i++) {
                // Randomly select an airline
                String[] airlines = airlinePrefixes.keySet().toArray(new String[0]);
                String airline = airlines[ThreadLocalRandom.current().nextInt(airlines.length)];
    
                // Get the prefix for the selected airline
                String prefix = airlinePrefixes.get(airline);
    
                // Generate a random flight number
                int flightNumber = ThreadLocalRandom.current().nextInt(100, 999);
    
                // Combine the prefix and flight number
                String flightName = prefix + " Flight " + flightNumber;
    
                // Create and save the flight
                Flight flight = new Flight(flightName, airline);
                flightRepository.save(flight);

                for (int j = 0; j < 3; j++) {
                    flightAccommodationInitializer.addRandomAccommodationToFlight(flight);
                    flightClassInitializer.generateFlightClassesForFlight(flight);
                }
    
                scheduledFlightsInitializer.generateRandomScheduledFlightForFlight(flight);
            }
    
            logger.info(numberOfFlights + " random flights generated successfully.");
        } catch (Exception e) {
            logger.error("Error generating flight: " + e.getMessage());
        }
    }
}