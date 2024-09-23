import localData from "../json/local-data.json";
import isLoggedIn from "./is-logged-in";

/**
 * Retrieves data from local storage based on the provided collection.
 *
 * @param {string} collection - The name of the collection to retrieve.
 * @returns {object | null} - The retrieved data or null if the user is
 *   logged in.
 */
export default function getLocalData(collection: string): object | null {
  
  const data = localStorage.getItem(collection);
  const userLoggedIn = isLoggedIn();

  // If the user is logged in, ignore the local data.
  if (userLoggedIn) return null;

  // If the user is not logged in and there is
  // no data, create a new object and return it.
  if (!data) {
    localStorage.setItem(
      collection,
      JSON.stringify(localData[collection as keyof typeof localData])
    );
    return { ...localData[collection as keyof typeof localData] };
  };
  
  // If the user is not logged in and there is data, return it.
  if (data) return JSON.parse(data);

  return null;
};
