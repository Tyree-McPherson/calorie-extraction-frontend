/**
 * Stores the given profile data in local storage.
 *
 * @param {object} profileData The profile data to store.
 */
export default function storeLocalProfileData(profileData: object): void {
  localStorage.setItem("profileData", JSON.stringify(profileData));
};
