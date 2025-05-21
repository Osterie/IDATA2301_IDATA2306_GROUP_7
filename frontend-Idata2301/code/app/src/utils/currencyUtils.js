import { getPreferredCurrency } from "./cookieUtils";

export const saveConvertionTableToLocalStorage = () => {
  fetch("https://openexchangerates.org/api/latest.json?app_id=2339143d97cf4826a4e3fa0d38d291de")
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

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const conversionTable = JSON.parse(localStorage.getItem("currency_convertion_table"));
  if (!conversionTable) {
    console.error("Conversion table not found in local storage.");
    return amount; // Return the original amount if conversion table is not available
  }

  const rate = conversionTable.rates[toCurrency] / conversionTable.rates[fromCurrency];
  return (amount * rate).toFixed(0);
}

export const calculateDiscountedPrice = (price, discount) => {
  return discount > 0 ? (price - (price * discount) / 100).toFixed(0) : price;

};
export const calculateFinalPriceInUserCurrency = (price, discount, currencyCode) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return convertCurrency(discountedPrice, currencyCode, getPreferredCurrency());
};