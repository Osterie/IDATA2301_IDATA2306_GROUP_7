// favoritesApi.js
import { sendApiRequest } from "./request.js";

export function fetchFavoriteFlights(userId, onSuccess, onError) {
  sendApiRequest("GET", `/favorites/${userId}`, onSuccess, null, onError);
}

export function addFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest("POST", `/favorites/?userId=${userId}&priceId=${priceId}`, onSuccess, null, onError);
}

export function removeFavoriteFlight(userId, priceId, onSuccess, onError) {
  sendApiRequest("DELETE", `/favorites/?userId=${userId}&priceId=${priceId}`, onSuccess, null, onError);
}

