/**
 * Capitalize the first letter of a string.
 *
 * @param {string} text The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Capitalize the first letter of each string in an array.
 *
 * @param {string[]} data The array of strings to capitalize.
 * @returns {string[]} The array of capitalized strings.
 */
export function capitalizeFirstLetterInArray(data: string[]): string[] {
  return data.map(capitalizeFirstLetter);
};