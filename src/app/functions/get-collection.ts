import { environment } from "src/environments/environment";

/**
 * Retrieves a collection from the server.
 *
 * @param {string} collection - The name of the collection to retrieve.
 * @returns {{ success: boolean, data: any }} - An object that resolves to an
 *   object with a `success` flag and the retrieved data.
 * @throws {Error} - If an error occurs during the request.
 */
export default async function getCollection(
  collection: string
): Promise<{ success: boolean; data: any; }> {
  
  const userId = localStorage.getItem("userID")!;
  const payload = new FormData();
  payload.append("userId", userId);
  payload.append("collection", collection);

  const responseData = await fetch(`${environment.apiUrl}getCollection`, {
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
    const errorMessage = error.response?.data?.message
      || "An unknown error occurred."
    return {
      success: false,
      data: error.message === "Request aborted" ? null : errorMessage
    };
  });

  return {
    success: responseData.success,
    data: responseData.data
  };
};
