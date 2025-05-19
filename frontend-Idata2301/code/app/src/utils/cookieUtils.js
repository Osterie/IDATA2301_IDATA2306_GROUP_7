import Cookies from "js-cookie";

// === Consent ===
export const setConsent = () => {
  Cookies.set("user_consent", "true", { expires: 30 });
};

export const hasConsent = () => {
  return Cookies.get("user_consent") === "true";
};

// === Preferences ===
export const setPreferredCurrency = (currency) => {
  Cookies.set("preferred_currency", currency, { expires: 30 });
};

export const getPreferredCurrency = () => {
  return Cookies.get("preferred_currency") || "USD";
};

export const setDepartureAirport = (code) => {
  Cookies.set("departure_airport", code, { expires: 30 });
};

export const getDepartureAirport = () => {
  return Cookies.get("departure_airport");
};

export const setLastSearch = (searchData) => {
  Cookies.set("last_search", JSON.stringify(searchData), { expires: 7 });
};

export const getLastSearch = () => {
  const val = Cookies.get("last_search");
  return val ? JSON.parse(val) : null;
};

// === Location (IP-based) ===
export const setUserInformationFromIp = async () => {

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
