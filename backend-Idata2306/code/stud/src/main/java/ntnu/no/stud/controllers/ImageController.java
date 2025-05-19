package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.FlightCompany;
import ntnu.no.stud.repositories.FlightCompanyRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

/**
 * REST API controller to serve image data related to flight companies.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class ImageController {

  private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

  @Autowired
  private FlightCompanyRepository companyRepository;

  /**
   * Endpoint to retrieve banner image data of a flight company by ID.
   *
   * @param id The ID of the flight company
   * @return The image as byte[] in response entity or error message
   */
  @GetMapping("/api/company/{id}/image")
  public ResponseEntity<?> getCompanyImage(@PathVariable int id) {
    logger.info("Request received to fetch company image for ID: {}", id);

    FlightCompany company = companyRepository.findById(id);
    if (company != null && company.getImageData() != null) {
      logger.info("Successfully fetched image data for company ID: {}", id);
      return ResponseEntity
              .ok()
              .contentType(MediaType.IMAGE_JPEG)
              .body(company.getImageData());
    } else {
      logger.warn("No image found for company ID: {}", id);
      return new ResponseEntity<>("Image not found", HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Endpoint to retrieve logo image data of a flight company by ID.
   *
   * @param id The ID of the flight company
   * @return The logo image as byte[] in response entity or error message
   */
  @GetMapping("/api/company/{id}/logo")
  public ResponseEntity<?> getCompanyLogo(@PathVariable int id) {
    logger.info("Request received to fetch company logo for ID: {}", id);

    FlightCompany company = companyRepository.findById(id);
    if (company != null && company.getLogoImageData() != null) {
      logger.info("Successfully fetched logo image data for company ID: {}", id);
      return ResponseEntity
              .ok()
              .contentType(MediaType.IMAGE_PNG)
              .body(company.getLogoImageData());
    } else {
      logger.warn("No logo image found for company ID: {}", id);
      return new ResponseEntity<>("Logo image not found", HttpStatus.NOT_FOUND);
    }
  }
}
