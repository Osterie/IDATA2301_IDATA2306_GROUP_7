// favoritesAPI.js
import { sendApiRequest } from "./requests.js";

// Fetch favorite flights for a specific user
export function fetchFavoriteFlights(userId, onSuccess, onError) {
  sendApiRequest(
    "GET", 
    `/favorites/${userId}`, 
    onSuccess, 
    null, 
    onError
  );
}

// Add a favorite flight for a user
export function addFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "POST", 
    `/favorites/?userId=${userId}&priceId=${priceId}`, 
    onSuccess, 
    null, 
    onError
  );
}

// Remove a favorite flight for a user
export function removeFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "DELETE", 
    `/favorites/?userId=${userId}&priceId=${priceId}`, 
    onSuccess, 
    null, 
    onError
  );
}
