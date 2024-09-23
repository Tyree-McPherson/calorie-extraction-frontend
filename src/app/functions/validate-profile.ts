import genders from "../json/genders.json";

/**
 * Validates the user's profile data. Checks to see if the height, weight,
 * birthday and gender are valid. If any of the data is invalid, the
 * corresponding error message is stored in the validation object. The
 * allValid property is set to true if all the data is valid, false otherwise.
 *
 * @param {string} height - The user's height in centimeters.
 * @param {string} weight - The user's weight in pounds.
 * @param {string} birthday - The user's birthday in the format
 *   MM/DD/YYYY.
 * @param {string} gender - The user's gender, either "Male" or "Female".
 *
 * @returns {{height: string, weight: string, birthday: string, gender: string,
 *   allValid: boolean}} An object containing the error messages for each
 *   field if the data is invalid, and a boolean indicating whether all the
 *   data is valid.
 */
export default function validateProfile(
  height: string,
  weight: string,
  birthday: string,
  gender: string
): {
  height: string; weight: string; birthday: string; gender: string;
  allValid: boolean;
} {

  const validation = {
    height: "",
    weight: "",
    birthday: "",
    gender: "",
    allValid: false
  };

  // Validate the height.
  if (height) {
    
    const isHeightValid = validateInteger(height, 3);
    
    if (!isHeightValid) validation.height =
      "Height must not exceed a 3 digit number.";
  };

  // Validate the weight.
  if (weight) {

    const isWeightValid = validateInteger(weight, 3);

    if (!isWeightValid) validation.weight =
      "Weight must not exceed a 3 digit number.";
  };
  
  // Validate the birthday.
  if (birthday) {
    const isBirthdayValid = validateBirthday(birthday);
    if (!isBirthdayValid) validation.birthday = "Invalid Birthday.";
  };

  // Validate the gender.
  if (gender) {
    const isGenderValid = containsStringFromArray(gender, genders);
    if (!isGenderValid) validation.gender = "Invalid Gender.";
  };

  validation.allValid = !validation.height && !validation.weight
  && !validation.birthday && !validation.gender;

  return validation;
};

/**
 * Validates an integer string to ensure it is a valid integer
 * and its length does not exceed the given length.
 *
 * @param {string} integer - The string to validate.
 * @param {number} length - The expected length of the string.
 *
 * @returns {boolean} `true` if the string is a valid integer and does
 *   not exceed the given length, `false` otherwise.
 */
function validateInteger(integer: string, length: number): boolean {

  // Check to see if it is an integer.
  if (!Number.isInteger(parseInt(integer))) return false;

  // Check the length to see if it matches the expected length.
  if (integer.length > length) return false;

  return true;
};

/**
 * Validates a birthday string to ensure it is a valid date.
 *
 * @param {string} birthday - The birthday string to validate in the format
 *   MM/DD/YYYY.
 *
 * @returns {string|false} The validated birthday string in the format
 *   MM/DD/YYYY, or `false` if the string is invalid.
 */
function validateBirthday(birthday: string): string | false {
  try {

    const date = new Date(birthday);
    
    if (date.toString() === "Invalid Date") return false;

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    if (Number(month) > 12 || Number(day) > 31 || Number(year) < 1900) {
      return false;
    };

    return `${month}/${day}/${year}`;
    
  } catch (error) {
    return false;
  };
};

/**
 * Checks to see if any of the strings in the given array are present in the
 * given input string.
 *
 * @param {string} inputString - The string to check for the presence of the
 *  given strings.
 * @param {string[]} stringArray - The array of strings to check for.
 *
 * @returns {boolean} `true` if any of the strings in the array are present in
 *  the given input string, `false` otherwise.
 */
function containsStringFromArray(
  inputString: string,
  stringArray: string[]
): boolean {
  return stringArray.some(str => inputString.includes(str));
};