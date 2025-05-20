package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;

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
    private ScheduledFlightsRepository scheduledFlightsRepository;

    @Autowired
    public PriceInitializer(PriceRepository priceRepository, FlightClassesRepository flightClassesRepository) {
        this.priceRepository = priceRepository;
        this.flightClassesRepository = flightClassesRepository;
    }

public void generatePrices() {
    try {
        String[] priceCodes = {
            "USD", "NOK", "EUR", "CHF", "AED", "QAR"
        };
        String[] providers = {
            "Skyscanner", "CheapOair", "Orbitz", "OneTravel", "Travelocity",
            "Google Flights", "JustFly", "eDreams", "Priceline", "American Airlines Website"
        };

        Iterable<ScheduledFlights> scheduledFlights = scheduledFlightsRepository.findAll();

        for (ScheduledFlights scheduledFlight : scheduledFlights) {
            List<FlightClasses> flightClassesForFlight = flightClassesRepository.findByFlightId(
                scheduledFlight.getFlight().getId()
            );
            if (flightClassesForFlight.isEmpty()) {
                logger.error("Cannot generate price: No flight classes available for flight ID " + scheduledFlight.getFlight().getId());
                continue;
            }

            for (FlightClasses flightClass : flightClassesForFlight) {
                // Randomly select a price code (same for both prices)
                String priceCode = priceCodes[ThreadLocalRandom.current().nextInt(priceCodes.length)];

                // --- First Price ---
                int priceValue1 = ThreadLocalRandom.current().nextInt(1, 30) * 50;
                int discount1 = generateRandomDiscount();
                String provider1 = providers[ThreadLocalRandom.current().nextInt(providers.length)];

                Price price1 = new Price(flightClass, priceValue1, priceCode, provider1, discount1, scheduledFlight);
                priceRepository.save(price1);

                // --- Second Price (duplicate with different price and provider) ---
                int priceValue2;
                do {
                    priceValue2 = ThreadLocalRandom.current().nextInt(1, 30) * 50;
                } while (priceValue2 == priceValue1);

                String provider2;
                do {
                    provider2 = providers[ThreadLocalRandom.current().nextInt(providers.length)];
                } while (provider2.equals(provider1));

                int discount2 = generateRandomDiscount();

                Price price2 = new Price(flightClass, priceValue2, priceCode, provider2, discount2, scheduledFlight);
                priceRepository.save(price2);
            }
        }
    } catch (Exception e) {
        logger.error("Error generating price for scheduled flights.", e);
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