import { environment } from "src/environments/environment";

/**
 * Updates a collection in the Firestore database.
 *
 * @param {string} collection - The name of the collection to update.
 * @param {object} documentData - The data to update in the document.
 * @returns {Promise<{success: boolean, data: any}>} - A promise that resolves
 *   with an object containing a boolean indicating success and a message or
 *   error message.
 */

export default async function updateCollection(
  collection: string,
  documentData: object
): Promise<{ success: boolean; data: any; }> {
  
  const userId = localStorage.getItem("userID")!;
  const payload = new FormData();
  payload.append("userId", userId);
  payload.append("collection", collection);
  payload.append("documentData", JSON.stringify(documentData));

  const responseData = await fetch(`${environment.apiUrl}updateCollection`, {
    method: "POST",
    body: payload
  })
  .then(async (response: any) => {

    const data = await response.json();

    return {
      success: true,
      data: data
    };
  })
  .catch((error) => {
    return {
      success: false,
      data: error.response?.data?.message || "An unknown error occurred."
    };
  });

  return {
    success: responseData.success,
    data: responseData.data
  };
};
