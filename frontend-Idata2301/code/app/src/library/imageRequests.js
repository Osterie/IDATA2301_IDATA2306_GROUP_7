import { sendApiRequest } from "./requests";

/**
 * Fetches the main image (imageData) for a flight company by ID.
 * @param {number} companyId - ID of the flight company.
 */
export async function getCompanyImage(companyId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "GET",
      `/company/${companyId}/image`,
      function (imageBlob) {
        console.log("Successfully fetched company image");
        resolve(imageBlob);
      },
      null,
      function (errorText) {
        console.error("Error fetching company image:", errorText);
        reject(new Error(`Failed to fetch image: ${errorText}`));
      }
    );
  });
}

/**
 * Fetches the logo image (logoImageData) for a flight company by ID.
 * @param {number} companyId - ID of the flight company.
 */
export async function getCompanyLogo(companyId) {
  return new Promise((resolve, reject) => {
    sendApiRequest(
      "GET",
      `/company/${companyId}/logo`,
      function (logoBlob) {
        console.log("Successfully fetched company logo");
        resolve(logoBlob);
      },
      null,
      function (errorText) {
        console.error("Error fetching company logo:", errorText);
        reject(new Error(`Failed to fetch logo: ${errorText}`));
      }
    );
  });
}
