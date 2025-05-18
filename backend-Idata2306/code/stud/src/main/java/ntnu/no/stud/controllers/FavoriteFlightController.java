package ntnu.no.stud.controllers;

import ntnu.no.stud.entities.FavoriteFlight;
import ntnu.no.stud.entities.Price;
import ntnu.no.stud.entities.User;
import ntnu.no.stud.repositories.FavoriteFlightRepository;
import ntnu.no.stud.repositories.PriceRepository;
import ntnu.no.stud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteFlightController {

    @Autowired
    private FavoriteFlightRepository favoriteFlightRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private UserRepository userRepository;

    // DTO class to map JSON request body
    public static class FavoriteRequest {
        public int userId;
        public int priceId;
    }

    // Fetch all favorite prices for a specific user
    @GetMapping("/{userId}")
    public List<FavoriteFlight> getFavoritesForUser(@PathVariable int userId) {
        return StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                .filter(fav -> fav.getUser().getId() == userId)
                .collect(Collectors.toList());
    }

    // Add a favorite price (accept JSON body now)
    @PostMapping("/addFavoritePrice")
    public FavoriteFlight addFavoritePrice(@RequestBody FavoriteRequest request) {
        Optional<User> userOpt = userRepository.findById(request.userId);
        Optional<Price> priceOpt = priceRepository.findById(request.priceId);

        if (userOpt.isPresent() && priceOpt.isPresent()) {
            User user = userOpt.get();
            Price price = priceOpt.get();

            // Prevent duplicate
            boolean exists = StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                    .anyMatch(fav -> fav.getUser().getId() == request.userId && fav.getPrice().getId() == request.priceId);

            if (exists) {
                throw new IllegalStateException("Price is already in user's favorites.");
            }

            FavoriteFlight favorite = new FavoriteFlight(user, price);
            return favoriteFlightRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("Invalid user or price ID.");
        }
    }

    // Delete a favorite price
    @DeleteMapping("/removeFavoritePrice")
    public void removeFavoritePrice(@RequestBody FavoriteRequest request) {

        int userId = request.userId;
        int priceId = request.priceId;

        List<FavoriteFlight> favorites = StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                .filter(fav -> fav.getUser().getId() == userId && fav.getPrice().getId() == priceId)
                .collect(Collectors.toList());

        favorites.forEach(favoriteFlightRepository::delete);
    }
}