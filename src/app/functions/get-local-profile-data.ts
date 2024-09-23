/**
 * Retrieves the local profile data from local storage.
 *
 * @returns {PersonAttributes} The local profile data, or a default object if
 *   no data is found. The default object has null values for all properties.
 */
export default function getLocalProfileData(): PersonAttributes {
  
  const profileData = localStorage.getItem("profileData");

  if (profileData) return JSON.parse(profileData);

  return {
    age: {
      birthday: null
    },
    gender: {
      gender: null
    },
    height: {
      height: null
    },
    weight: {
      weight: null
    }
  };
};
