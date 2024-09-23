/**
 * Returns a number (0-6) corresponding to the given weekday string.
 *
 * 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
 *
 * @param {string} weekday - The weekday string to convert.
 * @returns {number} - The number corresponding to the given weekday string.
 */
export default function getWeekdayAsNumber(weekday: string): number {
  const map: any = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6
  };
  return map[weekday];
};
