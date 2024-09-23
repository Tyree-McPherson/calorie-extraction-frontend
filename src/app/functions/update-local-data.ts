/**
 * Updates the given collection in local storage with the provided data.
 *
 * @param {string} collection - The name of the collection to update.
 * @param {object} data - The data to update the collection with.
 */
export default function updateLocalData(collection: string, data: object) {
  localStorage.setItem(collection, JSON.stringify(data));
};
