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

  if (Cookies.get("country")) return; // Country already set

  try{
    const res = await fetch("https://ipapi.co/json/");

    // Check if the status code is 429 (Too Many Requests)
    if (res.status === 429) {
      throw new Error('Rate limit exceeded');
    }

    const data = await res.json();
    Cookies.set("country", data.country_name, { expires: 30 });
    setPreferredCurrency(data.currency);
    setDepartureAirport(data.country_code === "NO" ? "OSL" : "");
  }
  catch (error) {
    if (error.message === 'Rate limit exceeded') {
      console.error("Failed to use cookies api for ipaip.co/json/, rate limit exceeded:", error);
    }
    else{
      console.error("Failed to use cookies api for ipaip.co/json/, error:", error);
    }
  }
};

export const getCountry = () => Cookies.get("country");
