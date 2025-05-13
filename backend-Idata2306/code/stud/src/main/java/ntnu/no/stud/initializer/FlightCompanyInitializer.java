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

    @PostConstruct
    public void init() {
        createCompany("American Airlines", "https://aa.com", "https://logo.com/aa.png");
        createCompany("Delta Air Lines", "https://delta.com", "https://logo.com/delta.png");
        createCompany("Lufthansa", "https://lufthansa.com", "https://logo.com/lh.png");
        createCompany("Emirates", "https://emirates.com", "https://logo.com/ek.png");
        createCompany("Qatar Airways", "https://qatarairways.com", "https://logo.com/qr.png");
        createCompany("Singapore Airlines", "https://singaporeair.com", "https://logo.com/sq.png");
        createCompany("Air France", "https://airfrance.com", "https://logo.com/af.png");
        createCompany("KLM Royal Dutch Airlines", "https://klm.com", "https://logo.com/klm.png");
        createCompany("Norwegian Air Shuttle", "https://norwegian.com", "https://logo.com/norwegian.png");
        createCompany("Alitalia", "https://alitalia.com", "https://logo.com/alitalia.png");
        createCompany("Swiss International Air Lines", "https://swiss.com", "https://logo.com/swiss.png");
    }

    private void createCompany(String name, String website, String imageUrl) {
        if (!flightCompanyRepository.existsByName(name)) {
            FlightCompany company = new FlightCompany(name, website, imageUrl, null);
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
