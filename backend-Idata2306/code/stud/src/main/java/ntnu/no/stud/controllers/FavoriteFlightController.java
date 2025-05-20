package ntnu.no.stud.controllers;

import ntnu.no.stud.dto.FavoriteRequest;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
@Tag(name = "Favorite Flights", description = "Manage user's favorite flight prices")
public class FavoriteFlightController {

    @Autowired
    private FavoriteFlightRepository favoriteFlightRepository;

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private UserRepository userRepository;

    @Operation(summary = "Get favorite prices for a user",
               description = "Returns a list of favorite flight prices for the specified user ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "List of favorite flights retrieved",
            content = @Content(schema = @Schema(implementation = FavoriteFlight.class))),
        @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
    })
    @GetMapping("/{userId}")
    public List<FavoriteFlight> getFavoritesForUser(@PathVariable int userId) {
        return StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                .filter(fav -> fav.getUser().getId() == userId)
                .collect(Collectors.toList());
    }

    @Operation(summary = "Add a favorite price for a user",
               description = "Adds a flight price to the user's favorites.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Favorite added successfully",
            content = @Content(schema = @Schema(implementation = FavoriteFlight.class))),
        @ApiResponse(responseCode = "400", description = "Invalid user or price ID, or duplicate favorite",
            content = @Content)
    })
    @PostMapping("/addFavoritePrice")
    public FavoriteFlight addFavoritePrice(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Favorite request payload containing userId and priceId",
            required = true,
            content = @Content(schema = @Schema(implementation = FavoriteRequest.class))
        )
        @RequestBody FavoriteRequest request) {
        Optional<User> userOpt = userRepository.findById(request.getUserId());
        Optional<Price> priceOpt = priceRepository.findById(request.getPriceId());

        if (userOpt.isPresent() && priceOpt.isPresent()) {
            User user = userOpt.get();
            Price price = priceOpt.get();

            boolean exists = StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                    .anyMatch(fav -> fav.getUser().getId() == request.getUserId() && fav.getPrice().getId() == request.getPriceId());

            if (exists) {
                throw new IllegalStateException("Price is already in user's favorites.");
            }

            FavoriteFlight favorite = new FavoriteFlight(user, price);
            return favoriteFlightRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("Invalid user or price ID.");
        }
    }

    @Operation(summary = "Remove a favorite price for a user",
               description = "Removes a flight price from the user's favorites.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Favorite removed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user or price ID",
            content = @Content)
    })
    @DeleteMapping("/removeFavoritePrice")
    public void removeFavoritePrice(
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Favorite request payload containing userId and priceId",
            required = true,
            content = @Content(schema = @Schema(implementation = FavoriteRequest.class))
        )
        @RequestBody FavoriteRequest request) {

        int userId = request.getUserId();
        int priceId = request.getPriceId();

        List<FavoriteFlight> favorites = StreamSupport.stream(favoriteFlightRepository.findAll().spliterator(), false)
                .filter(fav -> fav.getUser().getId() == userId && fav.getPrice().getId() == priceId)
                .collect(Collectors.toList());

        favorites.forEach(favoriteFlightRepository::delete);
    }
}
