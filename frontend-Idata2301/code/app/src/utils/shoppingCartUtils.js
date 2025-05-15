import Cookies from "js-cookie";
import { getCookie, setCookie } from "../library/tools";

const COOKIE_NAME = "shoppingCart";

// Get the shopping cart from cookies
export const getShoppingCart = () => {
  const savedCart = Cookies.get(COOKIE_NAME);
  return savedCart ? JSON.parse(savedCart) : [];
};

// Add a flight to the shopping cart
export const addToShoppingCart = (flight) => {
  const cart = getShoppingCart();
  if (!cart.some((item) => item.id === flight.id)) {
    const updatedCart = [...cart, flight];
    console.log(getCookie(COOKIE_NAME));
    console.log(updatedCart);
    setCookie(COOKIE_NAME, updatedCart, 1000*60*60*24*7); // Save to cookies (expires in 7 days)
    //Cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 }); // Save to cookies (expires in 7 days)
    console.log(getCookie(COOKIE_NAME));
    return { success: true, message: "Flight added to the shopping cart!" };
  }
  return { success: false, message: "This flight is already in your shopping cart!" };
};

// Remove a flight from the shopping cart
export const removeFromShoppingCart = (flightId) => {
  const cart = getShoppingCart();
  const updatedCart = cart.filter((item) => item.id !== flightId);
  Cookies.set(COOKIE_NAME, JSON.stringify(updatedCart), { expires: 7 }); // Update cookies
  return updatedCart;
};

export const clearShoppingCart = () => {
  Cookies.remove(COOKIE_NAME); // Clear the shopping cart from cookies
}