// package ntnu.no.stud;

// import org.springframework.web.bind.annotation.RestController;

// import ntnu.no.stud.repositories.FlightRepository;
// import ntnu.no.stud.entities.Flight;
// import ntnu.no.stud.repositories.PriceRepository;
// import ntnu.no.stud.entities.Price;
// import ntnu.no.stud.repositories.AirportRepository;
// import ntnu.no.stud.repositories.ClassRepository;
// import ntnu.no.stud.repositories.ExtraFeatureRepository;
// import ntnu.no.stud.repositories.FavoriteFlightRepository;
// import ntnu.no.stud.repositories.FlightClassesRepository;
// import ntnu.no.stud.repositories.PriceRepository;
// import ntnu.no.stud.repositories.PurchaseRepository;
// import ntnu.no.stud.repositories.RouteRepository;
// import ntnu.no.stud.repositories.ScheduledFlightsRepository;
// import ntnu.no.stud.repositories.UserRepository;
// import ntnu.no.stud.entities.User;
// import ntnu.no.stud.repositories.UserRolesRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import jakarta.validation.Valid;
// import org.springframework.security.access.prepost.PreAuthorize;


// /**
//  * 
//  * A REST API controller which responds to HTTP requests for /hello.
//  */
// @RestController
// @CrossOrigin(origins = "*") // Allow frontend access
// public class PostController {
    
//   @Autowired
//   private FlightRepository flightRepository; // Inject the flight repository

//   @Autowired
//   private AirportRepository airportRepository; // Inject the airport repository

//   @Autowired
//   private ClassRepository classRepository; // Inject the class repository

//   @Autowired
//   private ExtraFeatureRepository extraFeatureRepository; // Inject the extra feature repository

//   @Autowired
//   private FavoriteFlightRepository favoriteFlightRepository; // Inject the favorite flight repository

//   @Autowired
//   private FlightClassesRepository flightClassesRepository; // Inject the flight classes repository

//   @Autowired
//   private PriceRepository priceRepository; // Inject the price repository

//    /**
//    * Hides a flight from the user interface
//    */
//   @PostMapping("/hideFlight")
//   public void hidePrice(@RequestBody Price price) {
//     if (!priceRepository.existsById(price.getId())) {
//       throw new IllegalArgumentException("Price with id " + price.getId() + " does not exist");
//     }
//     priceRepository.save(price);
//   }


//   @Autowired
//   private PurchaseRepository purchaseRepository; // Inject the purchase repository

//   @Autowired
//   private RouteRepository routeRepository; // Inject the route repository

//   @Autowired
//   private ScheduledFlightsRepository scheduledFlightsRepository; // Inject the scheduled flights repository

//   @Autowired
//   private UserRepository userRepository; // Inject the user repository

//     /**
//    * Edits a information in user table
//    */
//   @PostMapping("/editUser")
//   @PreAuthorize("hasRole('ADMIN')")
//   public User editUser(@Valid @RequestBody User user) {
//     return userRepository.save(user);
//   }

//     /**
//    * Adds a user to the user table
//    */
//   @PostMapping("/addUser")
//   @PreAuthorize("hasRole('ADMIN')")
//   public User addUser(@Valid @RequestBody User user) {
//     return userRepository.save(user);
//   }

//     /**
//    * Remove a user from the user table
//    */
//   @PostMapping("/removeUser")
//   @PreAuthorize("hasRole('ADMIN')")
//   public void removeUser(@RequestBody User user) {
//     if (!userRepository.existsById(user.getId())) {
//       throw new IllegalArgumentException("User with id " + user.getId() + " does not exist");
//     }
//     userRepository.delete(user);
//   }



//   @Autowired
//   private UserRolesRepository userRolesRepository; // Inject the user roles repository

// }
