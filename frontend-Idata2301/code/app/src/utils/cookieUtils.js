import Cookies from "js-cookie";

// This function sets a cookie to indicate that the user has given consent
export const setConsent = () => {
  Cookies.set("user_consent", "true", { expires: 30 });
};

// This function checks if the user has given consent
export const hasConsent = () => {
  return Cookies.get("user_consent") === "true";
};

// This function sets the preferred currency in cookies
export const setPreferredCurrency = (currency) => {
  Cookies.set("preferred_currency", currency, { expires: 30 });
};

// This function retrieves the preferred currency from cookies
export const getPreferredCurrency = () => {
  return Cookies.get("preferred_currency") || "USD";
};

// This function sets the departure airport code in cookies
export const setDepartureAirport = (code) => {
  Cookies.set("departure_airport", code, { expires: 30 });
};

// This function retrieves the departure airport code from cookies
export const getDepartureAirport = () => {
  return Cookies.get("departure_airport");
};

// This function sets the last search data in cookies
export const setLastSearch = (searchData) => {
  Cookies.set("last_search", JSON.stringify(searchData), { expires: 7 });
};

// This function retrieves the last search data from cookies
export const getLastSearch = () => {
  const val = Cookies.get("last_search");
  return val ? JSON.parse(val) : null;
};

// This function sets adds user infomation based to cookies on the user's IP address
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

// gets the users country from the cookies
export const getCountry = () => Cookies.get("country");
