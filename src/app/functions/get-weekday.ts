import weekdaysJson from "../json/weekdays.json";

/**
 * Returns the current weekday as a string (e.g. "Monday", "Tuesday", ...).
 *
 * @returns {string} The current weekday as a string.
 */
export default function getWeekday(): string {
  // Create a new Date object for the current date and time.
  const date = new Date();

  // Get the day of the week (0-6) where 0 is Sunday and 6 is Saturday.
  const dayIndex = date.getDay();

  // Map the dayIndex to the corresponding day name.
  const weekdays = weekdaysJson;
  const weekday = weekdays[dayIndex];

  return weekday;
};
