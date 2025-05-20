import { sendApiRequest } from "./requests.js";

/**
 * Fetches all extra features (accommodations) associated with a flight.
 * @param {number} flightId The ID of the flight
 * @returns {Promise} Resolves with an array of extra features on success
 */
export async function getFlightAccommodations(flightId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "GET",
      `/flights/${flightId}/accommodations`,
      function (features) {
        console.log("Flight accommodations fetched successfully:", features);
        resolve(features);
      },
      null,
      function (errorText) {
        console.error("Failed to fetch flight accommodations:", errorText);
        reject(errorText);
      }
    );
  });
}
