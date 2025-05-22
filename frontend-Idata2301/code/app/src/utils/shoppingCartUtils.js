const STORAGE_KEY = "shopping_cart";

/**
 * Gets the shopping cart from local storage
 * 
 * @returns {Object} The shopping cart object
 */
export const getShoppingCart = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

/**
 * Gets the shopping cart as an array of flight IDs
 * 
 * @returns {Array} Array of flight IDs in the shopping cart
 */
export const getShoppingCartAsArray = () => {
  const cart = getShoppingCart();
  return Object.entries(cart).flatMap(([flightId, count]) =>
    Array(count).fill(flightId)
  );
};

/**
 * Add a flight to the shopping cart
 * 
 * @param {int} flightId Id of the flight to be added
 */
export const addToShoppingCart = (flightId) => {
  const cart = getShoppingCart();
  cart[flightId] = (cart[flightId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

/**
 * Remove one instance of a flight from the shopping cart
 * 
 * @param {int} flightId 
 */
export const removeFromShoppingCart = (flightId) => {
  const cart = getShoppingCart();

  if (cart[flightId]) {
    cart[flightId] -= 1;
    if (cart[flightId] <= 0) {
      delete cart[flightId];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
};

/**
 * Remove all instances of a flight from the shopping cart
 * 
 * @param {int} flightId 
 */
export const deleteFromShoppingCart = (flightId) => {
  const cart = getShoppingCart();
  delete cart[flightId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

/**
 * Clear the shopping cart
 */
export const clearShoppingCart = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Get the count of a specific flight in the shopping cart
 * 
 * @param {int} flightId 
 * @returns amount of flights matched by flightId
 */
export const getFlightInCartCount = (flightId) => {
  const cart = getShoppingCart();
  return cart[flightId] || 0;
}