// currencyUtils.js

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

/**
 * Converts an amount from one currency to another using live exchange rates.
 * @param {number} amount - The amount to convert.
 * @param {string} fromCurrency - ISO currency code of the source currency.
 * @param {string} toCurrency - ISO currency code of the target currency.
 * @returns {Promise<number>} - The converted amount.
 */
export const convertCurrencyLive = async (amount, fromCurrency, toCurrency) => {
  try {
    const res = await fetch(`${BASE_URL}/latest/${fromCurrency}`);
    const data = await res.json();

    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rate');
    }

    const rate = data.conversion_rates[toCurrency];

    if (!rate) {
      throw new Error(`Exchange rate for ${toCurrency} not found`);
    }

    return amount * rate;
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw error;
  }
};

/**
 * Format a number as a currency string.
 * @param {number} amount - Amount to format.
 * @param {string} currencyCode - ISO currency code (e.g., 'USD').
 * @param {string} [locale='en-US'] - Locale code for formatting.
 * @returns {string}
 */
export const formatCurrency = (amount, currencyCode, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};
