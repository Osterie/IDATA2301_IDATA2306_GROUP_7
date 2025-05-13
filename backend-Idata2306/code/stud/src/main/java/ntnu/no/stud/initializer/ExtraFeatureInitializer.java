package ntnu.no.stud.initializer;

import org.springframework.dao.DataAccessException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class ExtraFeatureInitializer {

    private static final Logger logger = LoggerFactory.getLogger(ExtraFeatureInitializer.class);

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExtraFeatureInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Loads extra features into the database.
     */

    public void loadExtraFeatures() {
        try {
            // SQL to insert extra feature data
            String sql = "INSERT INTO flight_application.extra_feature\r\n" + 
                                "(name) VALUES\r\n" + 
                                "\t('Complimentary Wi-Fi'),\r\n" + 
                                "    ('Seat-back Screens'),\r\n" + 
                                "    ('Free Snacks'),\r\n" + 
                                "    ('Free Breakfast'),\r\n" + 
                                "    ('Seat Reservation'),\r\n" + 
                                "    ('Fast Track'),\r\n" + 
                                "    ('In-flight Magazine'),\r\n" + 
                                "    ('Extra Legroom'),\r\n" + 
                                "    ('Complimentary Meals'),\r\n" + 
                                "    ('Lounge Access'),\r\n" + 
                                "    ('Enhanced Entertainment System'),\r\n" + 
                                "    ('Priority Boarding'),\r\n" + 
                                "    ('Lounge Access'),\r\n" + 
                                "    ('Swiss Chocolates'),\r\n" + 
                                "    ('Priority Check-in'),\r\n" + 
                                "    ('Complimentary Drinks'),\r\n" + 
                                "    ('Italian Cuisine'),\r\n" + 
                                "    ('Reserved Overhead Space'),\r\n" + 
                                "    ('Alitalia Lounges'),\r\n" + 
                                "    ('Wi-Fi'),\r\n" + 
                                "    ('On-demand Video'),\r\n" + 
                                "    ('Lounges Access'),\r\n" + 
                                "    ('Michelin-starred Menus'),\r\n" + 
                                "    ('Personal Coat Service'),\r\n" + 
                                "    ('Flat-bed Seats'),\r\n" + 
                                "    ('Shower Spas'),\r\n" + 
                                "    ('Award-winning Cuisine'),\r\n" + 
                                "    ('Fully Lie-flat Beds'),\r\n" + 
                                "    ('4000 Entertainment Options'),\r\n" + 
                                "    ('Book the Cook Service'),\r\n" + 
                                "    ('Givenchy Amenities'),\r\n" + 
                                "    ('Standalone Beds');";
            // Execute the SQL
            jdbcTemplate.execute(sql);
            logger.info("Extra features loaded successfully.");
        } catch (DataAccessException e) {
           logger.error("Database error occurred while loading extra features.", e);
       } catch (Exception e) {
           logger.error("Unexpected error occurred while loading extra features.", e);
       }
    }
}