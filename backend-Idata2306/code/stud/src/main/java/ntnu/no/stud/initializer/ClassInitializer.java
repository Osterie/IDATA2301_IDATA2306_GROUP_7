package ntnu.no.stud.initializer;

import org.springframework.dao.DataAccessException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class ClassInitializer {

    private static final Logger logger = LoggerFactory.getLogger(ClassInitializer.class);

    private final JdbcTemplate jdbcTemplate;

    public ClassInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void loadClasses() {
        try {
            // SQL to insert class data
            String sql = "INSERT INTO flight_application.class (name)" +
                    "  VALUES" +
                    "  ('Economy')," +
                    "  ('First')," +
                    "  ('Business')";

            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Classes loaded successfully.");
        } catch (DataAccessException e) {
            logger.error("Database error occurred while loading classes.", e);
        } catch (Exception e) {
            logger.error("Unexpected error occurred while loading classes.", e);
        }
    }
}
