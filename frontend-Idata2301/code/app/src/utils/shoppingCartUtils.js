import Cookies from "js-cookie";
import { getCookie, setCookie } from "../library/tools";

const COOKIE_NAME = "shoppingCart";

// // Get the shopping cart from cookies
// export const getShoppingCart = () => {
//   const savedCart = Cookies.get(COOKIE_NAME);
//   return savedCart ? JSON.parse(savedCart) : [];
// };

// // Add a flight to the shopping cart
// export const addToShoppingCart = (flightId) => {
//   const cart = getShoppingCart();
//   const updatedCart = [...cart, flightId];
//     console.log(getCookie(COOKIE_NAME));
//     console.log(updatedCart);
//     setCookie(COOKIE_NAME, updatedCart, 1000*60*60*24*7); // Save to cookies (expires in 7 days)
//     //Cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 }); // Save to cookies (expires in 7 days)
//     console.log(getCookie(COOKIE_NAME));
//     return { success: true, message: "Flight added to the shopping cart!" };
// };

// // Remove a flight from the shopping cart
// export const removeFromShoppingCart = (flightId) => {
//   const cart = getShoppingCart();
//   const updatedCart = cart.filter((item) => item.id !== flightId);
//   Cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 }); // Update cookies
//   return updatedCart;
// };

// export const clearShoppingCart = () => {
//   Cookies.remove(COOKIE_NAME); // Clear the shopping cart from cookies
// }

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

  // Increment and save the counter
  localStorage.setItem(counterKey, counter + 1);
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