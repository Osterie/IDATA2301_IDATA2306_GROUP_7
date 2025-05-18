import Cookies from "js-cookie";
import { getCookie, setCookie } from "../library/tools";

const COOKIE_NAME = "shoppingCart";

// Get the shopping cart from local storage
export const getShoppingCart = () => {
  const flightIds = [];

  for (const key in localStorage) {
    if (key.startsWith("flight_")) {
      flightIds.push(localStorage.getItem(key));
    }
  }

  return flightIds;
};

// Adds a flight to the shopping cart
export const addToShoppingCart = (flightId) => {
  const counterKey = "flight_counter";
  let counter = parseInt(localStorage.getItem(counterKey)) || 0;

  // Store the flight ID
  localStorage.setItem(`flight_${counter}`, flightId);
};


export const removeFromShoppingCart = (flightId) => {
  const keysToRemove = [];

  // Iterate through localStorage keys
  // and find keys that match the flight ID
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("flight_")) {
      // Check if the stored value matches the flight ID
      const storedValue = localStorage.getItem(key);
      if (String(storedValue) === String(flightId)) {
        // If it matches, add the key to the keysToRemove array
        keysToRemove.push(key);
      }
    }
  }
  // Remove the matching keys from localStorage
  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const clearShoppingCart = () => {
  const keysToRemove = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("flight_")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem("flight_counter");
};