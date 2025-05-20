package ntnu.no.stud.initializer;

import ntnu.no.stud.entities.FlightCompany;
import ntnu.no.stud.repositories.FlightCompanyRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Component
public class FlightCompanyInitializer {

    private final FlightCompanyRepository flightCompanyRepository;
    private final Map<String, FlightCompany> companyMap = new HashMap<>();

    public FlightCompanyInitializer(FlightCompanyRepository flightCompanyRepository) {
        this.flightCompanyRepository = flightCompanyRepository;
    }

    public void flightCompanyInitializer() {
        createCompany("American Airlines", "https://aa.com", "https://akamai.vgc.no/v2/images/2628ae8b-c4e8-4ace-bd55-fa6a78473066?fit=crop&format=auto&h=1068&w=1900&s=a60f9e009c50c91ce500a97ae9673dc00630e7e5", "AA", "AA_airline.jpg", "AA_logo.png");
        createCompany("Delta Air Lines", "https://delta.com", "https://news.delta.com/sites/default/files/styles/node_image_top_960/public/2020-03/A001_C006_0130XV.0001043F_r0.jpg?itok=8FiE75K5", "Delta", "Delta_airline.jpg", "Delta_logo.jpg");
        createCompany("Lufthansa", "https://lufthansa.com", "https://www.lufthansa.com/content/dam/lh/images/pixels_variations/c-31321474-3918114.jpg.transform/lh-dcep-transform-width-1440/img.jpg", "LH", "Lufthansa_airline.jpg", "Lufthansa_logo.jpg");
        createCompany("Emirates", "https://emirates.com", "https://content.presspage.com/uploads/2431/1920_1tw-2.jpg?10000", "EK", "Emirates_airline.jpg", "Emirates_logo.jpg");
        createCompany("Qatar Airways", "https://qatarairways.com", "https://d21buns5ku92am.cloudfront.net/69647/images/490377-WRAP%20UP-a3afe8-large-1687769659.jpg", "QR", "Qatar_airline.jpg", "Qatar_logo.jpg");
        createCompany("Singapore Airlines", "https://singaporeair.com", "https://www.singaporeair.com/saar5/images/navigation/flying-withus/our-fleet/boeing-787-10.jpg", "SQ", "Singapore_airline.jpg", "Singapore_logo.jpg");
        createCompany("Air France", "https://airfrance.com", "https://img.static-af.com/transform/acc76ee2-6c9e-4596-8514-afef78916eb8/?io=transform:fill,width:960,height:480&consumerid=bwp", "AF", "air_france_airline.jpg", "Air_france_logo.jpg");
        createCompany("KLM Royal Dutch Airlines", "https://klm.com", "https://www.cdbaviation.aero/wp-content/uploads/2023/08/CDB-Aviation-KLM-A321neo.jpg", "KLM", "KLM_airline.jpg", "KLM_logo.jpg");
        createCompany("Norwegian Air Shuttle", "https://norwegian.com", "https://img.static-af.com/transform/acc76ee2-6c9e-4596-8514-afef78916eb8/?io=transform:fill,width:960,height:480&consumerid=bwp", "Norwegian", "Norwegian_airline.jpg", "Norwegian_logo.jpg");
        createCompany("Alitalia", "https://alitalia.com", "https://www.politico.eu/cdn-cgi/image/width=1024,quality=80,onerror=redirect,format=auto/wp-content/uploads/2020/05/GettyImages-1147144160-scaled.jpg", "Alitalia", "Alitalia_airline.jpg", "Alitalia_logo.jpg");
        createCompany("Swiss International Air Lines", "https://swiss.com", "https://s28477.pcdn.co/wp-content/uploads/2017/07/Swiss_A320_1-984x554.jpg", "Swiss", "Swiss_airline.jpg", "Swiss_logo.jpg");
        createCompany("British Airways", "https://www.britishairways.com", "https://facts.net/wp-content/uploads/2023/07/16-facts-about-british-airways-1690021748.jpg", "BA", "British_airline.jpg", "British_logo.jpg");
    }

    private void createCompany(String name, String website, String imageUrl, String abbreviation,
                            String imageFilename, String logoFilename) {
        if (!flightCompanyRepository.existsByName(name)) {
            byte[] imageData = loadImageBytes(imageFilename);
            byte[] logoData = loadImageBytes(logoFilename);

            FlightCompany company = new FlightCompany(name, website, imageUrl, imageData, logoData, abbreviation);
            flightCompanyRepository.save(company);
            companyMap.put(name, company);
        } else {
            companyMap.put(name, flightCompanyRepository.findByName(name));
        }
    }


    public Map<String, FlightCompany> getCompanyMap() {
        return companyMap;
    }

    private byte[] loadImageBytes(String filename) {
        try (InputStream in = new ClassPathResource("images/" + filename).getInputStream()) {
            return in.readAllBytes();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
