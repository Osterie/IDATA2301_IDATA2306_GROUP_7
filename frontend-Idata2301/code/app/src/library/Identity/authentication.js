import {sendApiRequest} from "../requests.js";
import {getCookie, setCookie, deleteCookie} from "../tools.js";
import {redirectTo} from "../navigation.js";

// Authentication stuff

/**
 * Get the currently authenticated user
 * @returns User object or null if user is not authenticated
 */
export function getAuthenticatedUser() {
  let user = null;

  if (!checkJwtOnLoad()) {
    return null;
  }

  const username = getCookie("current_username");
  const id = getCookie("current_user_id");
  const commaSeparatedRoles = getCookie("current_user_roles");
  if (username) {
    const roles = commaSeparatedRoles.split(",");
    user = {
      "id": id,
      "username": username,
      "roles": roles
    }
  }

  return user;
}

/**
 * Check if the given user has admin rights
 * @param user
 * @returns {boolean}
 */
export function isAdmin(user) {

  if (!user) {
    return false;
  }

  
  const roles = user.roles;
  if (!roles) {
    return false;
  }
  
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].toUpperCase() === "ADMIN") {
      return true;
    }
  }
}

/**
 * Send authentication request to the API
 * @param username Username
 * @param password Password, plain text
 * @param successCallback Function to call on success
 * @param errorCallback Function to call on error, with response text as the parameter
 */
export async function sendAuthenticationRequest(username, password, successCallback, errorCallback) {
  const postData = {
    "username": username,
    "password": password
  };
  sendApiRequest(
    "POST", "/authenticate",
    function (jwtResponse) {
      setCookie("jwt", jwtResponse.jwt, getExpirationMilliseconds(jwtResponse.jwt));
      const userData = parseJwtUser(jwtResponse.jwt);
      if (userData) {
        setCookie("current_user_id", userData.id);
        setCookie("current_username", userData.username);
        setCookie("current_user_roles", userData.roles.join(","));
        setCookie("current_email", userData.email);
      }
      successCallback();
    },
    postData,
    function (responseText) {
      errorCallback(responseText);
    }
  );
}

/**
 * Parse JWT string, extract information from it
 * Code copied from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
 * @param token JWT token string
 * @returns {any} Decoded JWT object
 */
export function parseJwt(token) {
  if (!token) return null;

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function getExpirationMilliseconds(jwt) {
  const payload = parseJwt(jwt);
  if (!payload || !payload.exp) return null;
  const expirationMilliseconds = payload.exp;
  return expirationMilliseconds * 1000;
}

/**
 * Parse JWT string, extract a User object
 * @param jwtString
 * @return User object
 */
export function parseJwtUser(jwtString) {
  let user = null;
  const jwtObject = parseJwt(jwtString);
  if (jwtObject) {
    user = {
      "id" : jwtObject.id,
      "username": jwtObject.sub,
      "email": jwtObject.email,
      "roles": jwtObject.roles.map(r => r.authority),
      "exp": jwtObject.exp,
    }
  }
  return user;
}


/**
 * Log-out the user
 */
export function doLogout() {
  console.log("Logging out...");
  deleteAuthorizationCookies();
  window.location.href = '/index.html'; // Adjust the URL as needed
}

/**
 * Delete all cookies related to authorization (user session)
 */
export function deleteAuthorizationCookies() {
  deleteCookie("jwt");
  deleteCookie("current_user_id");
  deleteCookie("current_username");
  deleteCookie("current_user_roles");
  deleteCookie("current_email");
}

function isJwtExpired(jwt) {
  const payload = parseJwtUser(jwt);
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export function checkJwtOnLoad() {
  const jwt = getCookie("jwt");
  if (!jwt || isJwtExpired(jwt)) {
    deleteAuthorizationCookies(); // delete jwt, username, etc.
    return false;
  }
  return true;
}
