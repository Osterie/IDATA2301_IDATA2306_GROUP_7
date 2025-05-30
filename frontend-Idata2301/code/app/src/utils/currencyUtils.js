import { getPreferredCurrency } from "./cookieUtils";

const currencyConvertionTableAlternative = {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1748595600,
  "base": "USD",
  "rates":
    {
      "AED": 3.67293,
      "AFN": 69.740027,
      "ALL": 87.352312,
      "AMD": 384.598269,
      "ANG": 1.79,
      "AOA": 911.955,
      "ARS": 1184.0262,
      "AUD": 1.558838,
      "AWG": 1.80125,
      "AZN": 1.7,
      "BAM": 1.733573,
      "BBD": 2,
      "BDT": 122.248915,
      "BGN": 1.7267,
      "BHD": 0.376957,
      "BIF": 2977.774448,
      "BMD": 1,
      "BND": 1.290031,
      "BOB": 6.912843,
      "BRL": 5.6703,
      "BSD": 1,
      "BTC": 0.000009503109,
      "BTN": 85.546771,
      "BWP": 13.491522,
      "BYN": 3.273917,
      "BZD": 2.009502,
      "CAD": 1.381793,
      "CDF": 2905.752116,
      "CHF": 0.823931,
      "CLF": 0.024468,
      "CLP": 938.93,
      "CNH": 7.199088,
      "CNY": 7.1963,
      "COP": 4109.528783,
      "CRC": 509.311615,
      "CUC": 1,
      "CUP": 25.75,
      "CVE": 97.736215,
      "CZK": 22.01935,
      "DJF": 177.827972,
      "DKK": 6.587009,
      "DOP": 59.068059,
      "DZD": 132.099943,
      "EGP": 49.7417,
      "ERN": 15,
      "ETB": 135.8934,
      "EUR": 0.883044,
      "FJD": 2.2635,
      "FKP": 0.742638,
      "GBP": 0.742638,
      "GEL": 2.736,
      "GGP": 0.742638,
      "GHS": 13.2663,
      "GIP": 0.742638,
      "GMD": 71.9967,
      "GNF": 8667.805559,
      "GTQ": 7.683103,
      "GYD": 209.306357,
      "HKD": 7.842964,
      "HNL": 26.065645,
      "HRK": 6.649928,
      "HTG": 130.749243,
      "HUF": 356.797397,
      "IDR": 16354.595809,
      "ILS": 3.517085,
      "IMP": 0.742638,
      "INR": 85.630044,
      "IQD": 1310.504686,
      "IRR": 42250,
      "ISK": 127.34,
      "JEP": 0.742638,
      "JMD": 159.384116,
      "JOD": 0.709,
      "JPY": 144.056,
      "KES": 129.2,
      "KGS": 87.45,
      "KHR": 4005.547038,
      "KMF": 434.20922,
      "KPW": 900,
      "KRW": 1380.38128,
      "KWD": 0.30688,
      "KYD": 0.833725,
      "KZT": 508.664547,
      "LAK": 21611.469617,
      "LBP": 89641.206855,
      "LKR": 299.444168,
      "LRD": 200.081545,
      "LSL": 17.860556,
      "LYD": 5.48063,
      "MAD": 9.258036,
      "MDL": 17.350663,
      "MGA": 4547.972559,
      "MKD": 54.285733,
      "MMK": 2098,
      "MNT": 3398,
      "MOP": 8.078604,
      "MRU": 39.605918,
      "MUR": 45.759998,
      "MVR": 15.46,
      "MWK": 1734.778719,
      "MXN": 19.31266,
      "MYR": 4.25,
      "MZN": 63.830001,
      "NAD": 17.860556,
      "NGN": 1590.39,
      "NIO": 36.811177,
      "NOK": 10.186862,
      "NPR": 136.870595,
      "NZD": 1.680333,
      "OMR": 0.384477,
      "PAB": 1,
      "PEN": 3.642472,
      "PGK": 4.16698,
      "PHP": 55.804001,
      "PKR": 282.115124,
      "PLN": 3.753676,
      "PYG": 7993.626926,
      "QAR": 3.646573,
      "RON": 4.4725,
      "RSD": 103.496586,
      "RUB": 78.750379,
      "RWF": 1414.390841,
      "SAR": 3.751517,
      "SBD": 8.35076,
      "SCR": 14.216604,
      "SDG": 600.5,
      "SEK": 9.605975,
      "SGD": 1.291199,
      "SHP": 0.742638,
      "SLL": 20969.5,
      "SOS": 571.712234,
      "SRD": 37.206,
      "SSP": 130.26,
      "STD": 22281.8,
      "STN": 21.7162,
      "SVC": 8.753845,
      "SYP": 13002,
      "SZL": 17.851603,
      "THB": 32.78425,
      "TJS": 9.979391,
      "TMT": 3.505,
      "TND": 2.991778,
      "TOP": 2.40776,
      "TRY": 39.23933,
      "TTD": 6.794955,
      "TWD": 29.8925,
      "TZS": 2700,
      "UAH": 41.53454,
      "UGX": 3636.800518,
      "USD": 1,
      "UYU": 41.646507,
      "UZS": 12836.354662,
      "VES": 95.798672,
      "VND": 26017.952827,
      "VUV": 118.722,
      "WST": 2.8,
      "XAF": 579.239063,
      "XAG": 0.03013787,
      "XAU": 0.00030341,
      "XCD": 2.70255,
      "XDR": 0.719753,
      "XOF": 579.239063,
      "XPD": 0.00103545,
      "XPF": 105.37521,
      "XPT": 0.00093751,
      "YER": 243.677367,
      "ZAR": 17.8757,
      "ZMW": 26.540743,
      "ZWL": 322,
    },
  "saved": "2025-05-30T09:34:55.534Z",
}

// This function saves the conversion table to local storage if it doesn't exist or if it's older than 2 days
export const saveConvertionTableToLocalStorage = () => {

  if (localStorage.getItem("currency_convertion_table") !== null){
    return; // If the conversion table already exists, do nothing
  }
  
  fetch("https://openexchangerates.org/api/latest.json?app_id=9b524eb607954d77bb14f1fc1afe6940")
    .then((response) => response.json())
    .then((data) => {
      data.saved = new Date();
      if (localStorage.getItem("currency_convertion_table") === null) {
        localStorage.setItem(`currency_convertion_table`, JSON.stringify(data));
      }
      const convertionTable = JSON.parse(localStorage.getItem("currency_convertion_table"));
      // If the conversion table is older than 2 days, update it
      const savedDate = new Date(convertionTable.saved);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - savedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 2) {
        localStorage.setItem(`currency_convertion_table`, JSON.stringify(data));
      }
    })
    .catch((error) => {
      console.error('Error setting currency exchange table:', error);
    });
}

// This function retrieves the conversion rate between two currencies from local storage
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const conversionTable = JSON.parse(localStorage.getItem("currency_convertion_table"));
  if (!conversionTable) {
    console.error("Conversion table not found in local storage.");
    return amount; // Return the original amount if conversion table is not available
  }
  try{
    const rate = conversionTable.rates[toCurrency] / conversionTable.rates[fromCurrency];
    return (amount * rate).toFixed(0);
  }
  catch (error) {
    const rate = currencyConvertionTableAlternative.rates[toCurrency] / currencyConvertionTableAlternative.rates[fromCurrency];
    const result = (amount * rate).toFixed(0);

    if (isNaN(result)){
      return amount; // Return the original result if conversion rate is not available
    }
    return result
  }
}

// This function calculates the discounted price based on the original price and discount percentage
export const calculateDiscountedPrice = (price, discount) => {
  return discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;

};

// This function calculates the final price in the user's preferred currency after applying a discount
export const calculateFinalPriceInUserCurrency = (price, discount, currencyCode) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return convertCurrency(discountedPrice, currencyCode, getPreferredCurrency());
};