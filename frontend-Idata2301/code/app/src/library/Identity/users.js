import { sendApiRequest } from "../requests.js";
import { doLogout } from "./authentication.js";


/**
 * Gets all users from the API
 * @returns {Promise<*>}
 */
export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "GET",
      "/getUsers",
      function (userResponse) {
        resolve(userResponse);
      },
      null, 
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

/**
 * Deletes user with the given ID
 */
export async function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "DELETE",
      `/deleteUser/${userId}`,
      function (userResponse) {
        resolve(userResponse);
      },
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

/**
 * Deletes the current user
 * @returns {Promise<*>}
 */
export async function deleteSelf() {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "DELETE",
      `/deleteSelf`,
      function (userResponse) {
        doLogout();
        resolve(userResponse);
      },
      null,
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

/**
 * Assigns a role to a user
 * @param userId The ID of the user
 * @param role The role to assign
 * @returns {Promise<*>}
 */
export async function assignRoleToUser(userId, role) {
  return new Promise((resolve, reject) => {
    const postData = {
      id: userId,
      roleName: role.toUpperCase()
    };

    sendApiRequest(
      "POST",
      "/addRole", // Assuming the full endpoint is handled as /api/addRole
      function (userResponse) {
        resolve(userResponse);
      },
      postData,
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

/**
 * Removes a role from a user
 * @param userId The ID of the user
 * @param role The role to remove
 * @returns {Promise<*>}
 */
export async function removeRoleFromUser(userId, role) {
  return new Promise((resolve, reject) => {
    const postData = {
      id: userId,
      roleName: role
    };

    sendApiRequest(
      "POST",
      "/removeRole", // Assuming the full endpoint is handled as /api/removeRole
      function (userResponse) {
        resolve(userResponse);
      },
      postData,
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

