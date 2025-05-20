package ntnu.no.stud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the Stud application.
 * This class serves as the entry point for the Spring Boot application.
 */
@SpringBootApplication
public class StudApplication {

	/**
	 * Main method to run the application.
	 *
	 * @param args Command line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(StudApplication.class, args);
	}
}
