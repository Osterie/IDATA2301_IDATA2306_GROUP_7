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
