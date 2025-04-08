import Cookies from "js-cookie";

// === Consent ===
export const setConsent = () => {
  Cookies.set("userConsent", "true", { expires: 30 });
};

export const hasConsent = () => {
  return Cookies.get("userConsent") === "true";
};

// === Preferences ===
export const setPreferredCurrency = (currency) => {
  Cookies.set("preferredCurrency", currency, { expires: 30 });
};

export const getPreferredCurrency = () => {
  return Cookies.get("preferredCurrency") || "USD";
};

export const setDepartureAirport = (code) => {
  Cookies.set("departureAirport", code, { expires: 30 });
};

export const getDepartureAirport = () => {
  return Cookies.get("departureAirport");
};

export const setLastSearch = (searchData) => {
  Cookies.set("lastSearch", JSON.stringify(searchData), { expires: 7 });
};

export const getLastSearch = () => {
  const val = Cookies.get("lastSearch");
  return val ? JSON.parse(val) : null;
};

// === Location (IP-based) ===
export const setCountryFromIP = async () => {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  Cookies.set("country", data.country_name, { expires: 30 });
  setPreferredCurrency(data.currency);
  setDepartureAirport(data.country_code === "NO" ? "OSL" : "");
};

export const getCountry = () => Cookies.get("country");
