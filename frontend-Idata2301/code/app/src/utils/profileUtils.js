// utils/cookies.js

/**
 * Parse cookies from document.cookie into an object
 */
const parseCookies = () => {
  return document.cookie.split('; ').reduce((acc, cookieStr) => {
    const [name, value] = cookieStr.split('=');
    if (name && value !== undefined) {
      acc[name] = decodeURIComponent(value);
    }
    return acc;
  }, {});
};

/**
 * Get a specific cookie value by name
 * @param {string} name - The name of the cookie
 * @returns {string|null}
 */
export const getCookie = (name) => {
  const cookies = parseCookies();
  return cookies[name] || null;
};

/**
 * Get all required profile cookies
 * @returns {{
 *   country: string|null,
 *   current_email: string|null,
 *   current_user_id: string|null,
 *   current_user_roles: string[]|null,
 *   current_username: string|null,
 *   departur_airport: string|null,
 *   preferred_currency: string|null
 * }}
 */
export const getProfileCookies = () => {
  const cookies = parseCookies();

  return {
    country: cookies.country || null,
    current_email: cookies.current_email || null,
    current_user_id: cookies.current_user_id || null,
    current_user_roles: cookies.current_user_roles
      ? cookies.current_user_roles.split(',').map(role => role.trim())
      : null,
    current_username: cookies.current_username || null,
    departur_airport: cookies.departur_airport || null,
    preferred_currency: cookies.preferred_currency || null,
  };
};
