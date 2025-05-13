package ntnu.no.stud.initializer;

import jakarta.annotation.PostConstruct;
import ntnu.no.stud.entities.FlightCompany;
import ntnu.no.stud.repositories.FlightCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class FlightCompanyInitializer {

    private final FlightCompanyRepository flightCompanyRepository;
    private final Map<String, FlightCompany> companyMap = new HashMap<>();

    @Autowired
    public FlightCompanyInitializer(FlightCompanyRepository flightCompanyRepository) {
        this.flightCompanyRepository = flightCompanyRepository;
    }

    public void flightCompanyInitializer() {
        createCompany("American Airlines", "https://aa.com", "https://images.app.goo.gl/n1EZ86hcbnWW3r399", "AA");
        createCompany("Delta Air Lines", "https://delta.com", "https://images.app.goo.gl/zYxSrW6yM3jmM6cV7", "Delta");
        createCompany("Lufthansa", "https://lufthansa.com", "https://images.app.goo.gl/YCBLVgLaUvVErdV38", "LH");
        createCompany("Emirates", "https://emirates.com", "https://images.app.goo.gl/Hk3AvtacEWiunjzaA", "EK");
        createCompany("Qatar Airways", "https://qatarairways.com", "https://images.app.goo.gl/yWLgMi6xprkJmj6Q6", "QR");
        createCompany("Singapore Airlines", "https://singaporeair.com", "https://images.app.goo.gl/75nuboiT4msQSiN38", "SQ");
        createCompany("Air France", "https://airfrance.com", "https://images.app.goo.gl/3wc7F7SRaH2TtiYSA", "AF");
        createCompany("KLM Royal Dutch Airlines", "https://klm.com", "https://images.app.goo.gl/nbFzpG7DNH5AKmke9", "KLM");
        createCompany("Norwegian Air Shuttle", "https://norwegian.com", "https://images.app.goo.gl/kRcdsYSS7d6zqa916 ", "Norwegian");
        createCompany("Alitalia", "https://alitalia.com", "https://images.app.goo.gl/pYegULxoezf6uuzS6", "Alitalia");
        createCompany("Swiss International Air Lines", "https://swiss.com", "https://images.app.goo.gl/6Wb4Tnvkoz8mxDnM8", "Swiss");
        createCompany("British Airways", "https://www.britishairways.com", "https://images.app.goo.gl/KiPmGtr5sJXshpmq9", "BA");
    }

    private void createCompany(String name, String website, String imageUrl, String abbreviation) {
        if (!flightCompanyRepository.existsByName(name)) {
            FlightCompany company = new FlightCompany(name, website, imageUrl, null, null, abbreviation);
            flightCompanyRepository.save(company);
            companyMap.put(name, company);
        } else {
            companyMap.put(name, flightCompanyRepository.findByName(name));
        }
    }

    public Map<String, FlightCompany> getCompanyMap() {
        return companyMap;
    }
}
