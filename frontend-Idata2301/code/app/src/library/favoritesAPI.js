import { sendApiRequest } from "./requests.js";

export function fetchFavoriteFlights(userId, onSuccess, onError) {
  sendApiRequest(
    "GET",
    `/favorites/${userId}`,
    onSuccess,
    null,
    onError || ((err) => console.error("Fetch favorites failed:", err))
  );
}

export function addFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "POST",
    "/favorites",
    onSuccess,
    JSON.stringify({ userId, priceId }),
    onError || ((err) => console.error("Add favorite failed:", err))
  );
}

export function removeFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest(
    "DELETE",
    "/favorites",
    onSuccess,
    JSON.stringify({ userId, priceId }),
    onError || ((err) => console.error("Remove favorite failed:", err))
  );
}
