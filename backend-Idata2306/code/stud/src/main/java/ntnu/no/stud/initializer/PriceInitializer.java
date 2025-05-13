package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;
import java.util.List;

@Component
public class PriceInitializer {

    
    private static final Logger logger = LoggerFactory.getLogger(PriceInitializer.class);

    private final PriceRepository priceRepository;
    private final FlightClassesRepository flightClassesRepository;

    @Autowired
    public PriceInitializer(PriceRepository priceRepository, FlightClassesRepository flightClassesRepository) {
        this.priceRepository = priceRepository;
        this.flightClassesRepository = flightClassesRepository;
    }

    public void generatePriceForScheduledFlight(ScheduledFlights scheduledFlight) {
        try {
            // Fetch a random flight class for the given flight ID
            List<FlightClasses> flightClassesForFlight = flightClassesRepository.findByFlightId(scheduledFlight.getFlight().getId());
            if (flightClassesForFlight.isEmpty()) {
                logger.error("Cannot generate price: No flight classes available for flight ID " + scheduledFlight.getFlight().getId());
                return;
            }

            // Select a random flight class from the list
            FlightClasses randomFlightClass = flightClassesForFlight.get(ThreadLocalRandom.current().nextInt(flightClassesForFlight.size()));

            // Generate random price
            int priceValue = ThreadLocalRandom.current().nextInt(1, 30) * 50;

            int discount = generateRandomDiscount(); // Generate a random discount

            // Randomy select a price code
            String[] priceCodes = {
                "USD",
                "NOK",
                "EUR",
                "CHF",
                "AED",
                "QAR"
            };

            String priceCode = priceCodes[ThreadLocalRandom.current().nextInt(priceCodes.length)];

            // Randomly select a provider
            String[] providers = {
                "Skyscanner",
                "CheapOair",
                "Orbitz",
                "OneTravel",
                "Travelocity",
                "Google Flights",
                "JustFly",
                "eDreams",
                "Priceline",
                "American Airlines Website"
            };
            String provider = providers[ThreadLocalRandom.current().nextInt(providers.length)];

            // Create and save the price
            Price price = new Price(randomFlightClass, priceValue, priceCode, provider, discount, scheduledFlight);
            priceRepository.save(price);

        } catch (Exception e) {
            logger.error("Error generating price for scheduled flight: " + scheduledFlight.getId(), e);
        }
    }
    /**
 * Generates a random discount with 75% probability of being 0 and 25% probability of being 5, 10, 15, 20, or 25.
 * @return the generated discount
 */
private int generateRandomDiscount() {
    int randomValue = ThreadLocalRandom.current().nextInt(100); // Generate a random number between 0 and 99
    if (randomValue < 75) {
        return 0; // 75% chance of being 0
    } else {
        // 25% chance of being one of the increments (5, 10, 15, 20, 25)
        int[] possibleDiscounts = {5, 10, 15, 20, 25};
        return possibleDiscounts[ThreadLocalRandom.current().nextInt(possibleDiscounts.length)];
    }
}

}