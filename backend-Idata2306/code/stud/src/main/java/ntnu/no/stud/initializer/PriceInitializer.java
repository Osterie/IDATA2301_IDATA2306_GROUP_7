package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.FlightClasses;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.ScheduledFlights;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class PriceInitializer {

    private final PriceRepository priceRepository;
    private final ScheduledFlightsRepository scheduledFlightsRepository;
    private final FlightClassesRepository flightClassesRepository;

    @Autowired
    public PriceInitializer(PriceRepository priceRepository, ScheduledFlightsRepository scheduledFlightsRepository,
                             FlightClassesRepository flightClassesRepository) {
        this.priceRepository = priceRepository;
        this.scheduledFlightsRepository = scheduledFlightsRepository;
        this.flightClassesRepository = flightClassesRepository;
    }

    public void generateRandomPrices(int numberOfPrices) {
        for (int i = 0; i < numberOfPrices; i++) {
            // Fetch a random scheduled flight from the database
            ScheduledFlights randomScheduledFlight = scheduledFlightsRepository.findRandomScheduledFlight();
            if (randomScheduledFlight == null) {
                System.err.println("Cannot generate prices: No scheduled flights available.");
                return;
            }

            // Fetch a random flight class from the database
            FlightClasses randomFlightClass = flightClassesRepository.findRandomFlightClasses();
            if (randomFlightClass == null) {
                System.err.println("Cannot generate prices: No flight classes available.");
                return;
            }

            // Generate random price
            int priceValue = ThreadLocalRandom.current().nextInt(100, 1000);

            // Generate random price code
            String priceCode = generateRandomPriceCode();

            // Randomly select a provider
            String[] providers = {"ProviderA", "ProviderB", "ProviderC"};
            String provider = providers[ThreadLocalRandom.current().nextInt(providers.length)];

            // Create and save the price
            Price price = new Price(randomFlightClass, priceValue, priceCode, provider, 0, randomScheduledFlight);
            priceRepository.save(price);
        }
        

        System.out.println(numberOfPrices + " random prices generated successfully.");
    }

    private String generateRandomPriceCode() {
        // Generate a random 3-character price code
        char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        StringBuilder priceCode = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            priceCode.append(chars[ThreadLocalRandom.current().nextInt(chars.length)]);
        }
        return priceCode.toString();
    }
}