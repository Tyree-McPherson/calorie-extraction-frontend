/**
 * Converts a birthday to the age of a person in years.
 * @param {Date} birthday The birthday of the person.
 * @returns {string} The age of the person in years as a string.
 */
export default function convertBirthdayToAge(birthday: Date): string {
  return (
    new Date().getFullYear() - new Date(birthday).getFullYear()
  ).toString();
};
