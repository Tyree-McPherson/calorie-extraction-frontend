
/**
 * Calculates the Basal Metabolic Rate of a user given their height, weight,
 * age, and gender. The Basal Metabolic Rate is the number of calories the
 * body needs to function at rest.
 *
 * @param {string} height - The user's height in centimeters.
 * @param {string} weight - The user's weight in pounds.
 * @param {string} age - The user's age in years.
 * @param {String} gender - The user's gender, either "Male" or "Female".
 *
 * @returns {string} The user's Basal Metabolic Rate as a string.
 */
export default function calculateBmr(
  height: string,
  weight: string,
  age: string,
  gender: String
): string {
  
  // If any of the data is missing, the users' BMR cannot be calculated.
  if (height === null || weight === null || age === null || gender === null) {
    return "0";
  };

  // Convert all the strings to integers, except for the gender.
  const newHeight = parseInt(height);
  const newWeight = convertPoundsToKilograms(parseInt(weight));
  const newAge = parseInt(age);
  let bmr;

  if (gender === "Male") {

    bmr = 9.99 * newWeight + 6.25 * newHeight - 4.92 * newAge + 5;
    
  } else if (gender === "Female") {

    bmr = 9.99 * newWeight + 6.25 * newHeight - 4.92 * newAge - 161;
    
  } else {
    bmr = 9.99 * newWeight + 6.25 * newHeight - 4.92 * newAge - 78;
  };

  return Math.round(bmr).toString();
};

function convertPoundsToKilograms(weight: number): number {
  return Math.round(weight * 0.453592);
};