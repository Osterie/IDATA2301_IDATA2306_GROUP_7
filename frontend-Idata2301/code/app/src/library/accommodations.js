import { sendApiRequest } from "./requests.js";

/**
 * Fetches all extra features (accommodations) associated with a flight.
 * @param {number} flightId The ID of the flight
 * @returns {Promise} Resolves with an array of extra features on success
 */
export async function getFlightAccommodations(flightId, callback) {
  sendApiRequest(
    "GET",
    `/flights/accommodations/${flightId}`,
    callback,
    null,
    function (error) {
      console.error("Failed to fetch flight accommodations:", error);
    }
  );
}
