package ntnu.no.stud.initializer;

import org.springframework.dao.DataAccessException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class AirportInitializer {
    
    private static final Logger logger = LoggerFactory.getLogger(AirportInitializer.class);

    private final JdbcTemplate jdbcTemplate;

    public AirportInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void loadAirports() {
        try {
            // SQL to insert airport data
            String sql = "INSERT INTO flight_application.airport (airport_code, city)" +
                "VALUES" +
                "('JFK', 'New York')," +
                "('LAX', 'Los Angeles')," +
                "('ORD', 'Chicago')," +
                "('AES', 'Ålesund')," +
                "('AMS', 'Amsterdam')," +
                "('ZRH', 'Zurich')," +
                "('LHR', 'London Heathrow')," +
                "('FCO', 'Rome')," +
                "('CDG', 'Paris')," +
                "('DFW', 'Dallas')," +
                "('FRA', 'Frankfurt')," +
                "('HND', 'Tokyo')," +
                "('DXB', 'Dubai')," +
                "('DOH', 'Doha')," +
                "('SYD', 'Sydney')," +
                "('SIN', 'Singapore')";
             // Execute the SQL
             jdbcTemplate.execute(sql);
             logger.info("Airports loaded successfully.");
        } catch (DataAccessException e) {
           logger.error("Database error occurred while loading airports.", e);
       } catch (Exception e) {
           logger.error("Unexpected error occurred while loading airports.", e);
       }
    }
}
