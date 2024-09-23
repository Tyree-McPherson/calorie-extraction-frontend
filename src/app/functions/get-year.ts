/**
 * Returns the current year as a number (e.g. 2020, 2021, ...).
 *
 * @returns {number} The current year as a number.
 */
export default function getYear(): Number {
  return new Date().getFullYear();
};