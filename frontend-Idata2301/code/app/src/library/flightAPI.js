import { sendApiRequest } from "./requests";

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
      console.log("Error: " + errorResponse);
    }
  );
}