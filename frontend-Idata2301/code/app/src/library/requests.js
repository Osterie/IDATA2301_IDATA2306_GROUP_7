import { getCookie } from "./tools.js";

// All code for sending requests to backend is stored in this file

// The base path where the API is running
// TODO get the host and port from envirotment variable!!
const API_BASE_URL = "http://localhost:8080/api";

/**
 * Send a REST-API request to the backend
 * @param method The method to use: GET, POST, PUT, DELETE
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response text as the parameter
 * @param requestBody When supplied, send this data in the request body. Does not work with HTTP GET!
 * @param errorCallback A function called when the response code is not 200
 */
export async function sendApiRequest(
  method,
  url,
  callback,
  requestBody,
  errorCallback
) {
  let parameters = { method: method, headers: constructRequestHeaders(method) };

  if (requestBody) {
    parameters.body = typeof requestBody === 'string'
      ? requestBody
      : JSON.stringify(requestBody);
  }

  try {
    const response = await fetch(API_BASE_URL + url, parameters);

    let responseJson = null;
    const contentType = response.headers.get("content-type");

    if (response.ok) {
      if (contentType && contentType.includes("application/json")) {
        responseJson = await response.json();
      } else {
        // Use text only if not JSON
        const responseText = await response.text();
        responseJson = responseText || null;
      }
      callback(responseJson);
    } else {
      const errorText = await response.text();
      if (errorCallback) errorCallback(errorText);
    }
  } catch (error) {
    // Handle network or other errors (e.g., server down)
    const errorMessage = error.message || "An unknown error occurred.";
    if (errorCallback) errorCallback(errorMessage);
  }
}

/**
 * Construct HTTP Headers to be sent in a request
 * @param method
 * @return object An object containing the necessary HTTP headers
 */
export function constructRequestHeaders(method) {
  let headers = {};

  if (method.toLowerCase() !== "get") {
    headers["Content-Type"] = "application/json";
  }

  const jwtToken = getCookie("jwt");
  if (jwtToken) {
    headers["Authorization"] = "Bearer " + jwtToken;
  }
  return headers;
}
