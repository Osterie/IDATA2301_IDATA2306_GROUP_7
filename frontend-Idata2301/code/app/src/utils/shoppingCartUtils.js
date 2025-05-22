const STORAGE_KEY = "shopping_cart";

// Get the shopping cart object from localStorage
export const getShoppingCart = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

// Get cart as an array of flight IDs
export const getShoppingCartAsArray = () => {
  const cart = getShoppingCart();
  return Object.entries(cart).flatMap(([flightId, count]) =>
    Array(count).fill(flightId)
  );
};

// Add a flight to the shopping cart (increment quantity)
export const addToShoppingCart = (flightId) => {
  const cart = getShoppingCart();
  cart[flightId] = (cart[flightId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

// Remove one instance of a flight from the cart
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

// Fully remove a flight from the cart
export const deleteFromShoppingCart = (flightId) => {
  const cart = getShoppingCart();
  delete cart[flightId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

// Clear all cart data
export const clearShoppingCart = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Get the total number of items in the cart
export const getFlightInCartCount = (flightId) => {
  const cart = getShoppingCart();
  return cart[flightId] || 0;
}