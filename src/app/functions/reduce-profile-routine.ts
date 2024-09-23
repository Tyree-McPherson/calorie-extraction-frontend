/**
 * Reduces the given routine data to the exercises for the given weekday.
 * If there are no exercises for the given weekday, returns a string
 * indicating there is no data available.
 *
 * @param {any} routine The routine data to reduce.
 * @param {string} weekday The weekday to get the exercises for.
 * @returns {any|string} The exercises for the given weekday, or a string
 *   indicating there is no data available.
 */
export default function reduceProfileRoutine(
  routine: any,
  weekday: string
): any | string {

  routine = routine.data.json[weekday];

  // Delete all the exercises where there is no data.
  if (!routine.exercise_one.type) return "No routine data available for today";
  
  // Return the array.
  return routine;
};
