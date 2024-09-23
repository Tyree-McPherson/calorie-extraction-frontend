/**
 * Counts the total number of exercises in an array of exercises.
 *
 * @param {any[]} exercises - An array of exercises.
 * @returns {number} The total number of exercises.
 */
export default function countTotalExercises(exercises: any[]): number {

  let exerciseCount = 0;

  for (let i = 0; i < exercises.length; i++) {
    
    // If the first exercise is empty, return 0.
    if (!exercises[0].type) return 0;

    // If the next exercise is empty, return the index of the next exercise.
    if (!exercises[i].type) return i;

    exerciseCount++;
  }
  
  // Return the total number of exercises.
  return exerciseCount;
};
