package ntnu.no.stud.controllers;

import org.springframework.web.bind.annotation.RestController;

import ntnu.no.stud.repositories.FlightRepository;
import ntnu.no.stud.entities.Flight;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.repositories.AirportRepository;
import ntnu.no.stud.repositories.ClassRepository;
import ntnu.no.stud.repositories.ExtraFeatureRepository;
import ntnu.no.stud.repositories.FavoriteFlightRepository;
import ntnu.no.stud.repositories.FlightClassesRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.PurchaseRepository;
import ntnu.no.stud.repositories.RouteRepository;
import ntnu.no.stud.repositories.ScheduledFlightsRepository;
import ntnu.no.stud.repositories.UserRepository;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.repositories.UserRolesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * 
 * A REST API controller which responds to HTTP requests for /hello.
 */
@RestController
@CrossOrigin(origins = "*") // Allow frontend access
public class PriceRequestController {


  @Autowired
  private PriceRepository priceRepository; // Inject the price repository

   /**
   * Hides a flight from the user interface
   */
  @PostMapping("/hideFlight")
  @PreAuthorize("hasRole('ADMIN')")
  public void hidePrice(@RequestBody Price price) {
    if (!priceRepository.existsById(price.getId())) {
      throw new IllegalArgumentException("Price with id " + price.getId() + " does not exist");
    }
    price.setHidden(true);
    priceRepository.save(price);
  }

   /**
   * Shows a flight from the user interface
   */
  @PostMapping("/showFlight")
  @PreAuthorize("hasRole('ADMIN')")
  public void showPrice(@RequestBody Price price) {
    if (!priceRepository.existsById(price.getId())) {
      throw new IllegalArgumentException("Price with id " + price.getId() + " does not exist");
    }
    price.setHidden(false);
    priceRepository.save(price);
  }


}
