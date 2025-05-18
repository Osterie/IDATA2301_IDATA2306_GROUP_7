import { sendApiRequest } from "../requests.js";

export async function getAllUsers() {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "GET",
      "/getUsers",
      function (userResponse) {
        console.log("Success:", userResponse);
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

export async function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "DELETE",
      `/deleteUser/${userId}`,
      function (userResponse) {
        console.log("Success:", userResponse);
        resolve(userResponse);
      },
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

export async function deleteSelf(userId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "DELETE",
      `/deleteSelf/${userId}`,
      function (userResponse) {
        console.log("Success:", userResponse);
        resolve(userResponse);
      },
      function (errorText) {
        console.error("Error:", errorText);
        reject(errorText);
      }
    );
  });
}

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
        console.log("Success:", userResponse);
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
        console.log("Success:", userResponse);
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

