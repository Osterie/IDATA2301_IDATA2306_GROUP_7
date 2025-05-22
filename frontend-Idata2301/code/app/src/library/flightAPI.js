import { sendApiRequest } from "./requests";

/**
 * Updates the visibility of a flight product.
 * @param {Object} flight - The flight object to update.
 * @param {boolean} isHidden - The current visibility state of the flight.
 * @param {function} onVisibilityChange - Callback function to handle visibility change.
 * @param {Object} formData - Form data containing the new visibility state.
 */
export async function updateFlightVisibility(flight, isHidden, onVisibilityChange, formData) {
  await sendApiRequest(
    "POST",
    "/setFlightProductVisibility",
    (result) => {
      const updatedFlight = { ...flight, isHidden: !isHidden };
      if (typeof onVisibilityChange === "function") {
        onVisibilityChange(updatedFlight);
      }
    },
    JSON.stringify(formData),
    (errorResponse) => {
      console.error("Error: " + errorResponse);
    }
  );
}