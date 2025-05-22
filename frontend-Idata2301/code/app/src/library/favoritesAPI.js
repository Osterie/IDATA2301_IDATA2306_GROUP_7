import { sendApiRequest } from "./requests.js";

/**
 * Fetches the favorite flights for a given user.
 * @param {string} userId The ID of the user
 * @param {function} onSuccess Callback function to handle successful response
 * @param {function} onError Callback function to handle error response
 */
export function fetchFavoriteFlights(userId, onSuccess, onError) {
  sendApiRequest(
    "GET",
    `/favorites/${userId}`,
    onSuccess,
    null,
    onError || ((err) => console.error("Fetch favorites failed:", err))
  );
}

/**
 * Adds a flight to the user's favorites.
 * @param {string} userId The ID of the user
 * @param {string} priceId The ID of the flight price
 * @param {function} onSuccess Callback function to handle successful response
 * @param {function} onError Callback function to handle error response
 */
export function addFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "POST",
    "/favorites/addFavoritePrice",
    onSuccess,
    JSON.stringify({ userId, priceId }),
    onError || ((err) => console.error("Add favorite failed:", err))
  );
}

/**
 * Removes a flight from the user's favorites.
 * @param {string} userId The ID of the user
 * @param {string} priceId The ID of the flight price
 * @param {function} onSuccess Callback function to handle successful response
 * @param {function} onError Callback function to handle error response
 */
export function removeFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "DELETE",
    "/favorites/removeFavoritePrice",
    onSuccess,
    JSON.stringify({ userId, priceId }),
    onError || ((err) => console.error("Remove favorite failed:", err))
  );
}
