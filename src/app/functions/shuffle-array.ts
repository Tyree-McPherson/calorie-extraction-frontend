/**
 * This function takes an array as input and returns a new array with the same
 * elements in a random order.
 *
 * The algorithm used is the Fisher-Yates shuffle algorithm, which ensures that
 * every possible permutation of the elements is equally likely.
 *
 * The original array is not modified.
 *
 * @param {any[]} array The array to be shuffled.
 * @returns {any[]} The shuffled array.
 */
export default function shuffleArray(array: any[]): any[] {

  // Create a copy of the array to avoid mutating the original array.
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] =
      [shuffledArray[j], shuffledArray[i]];
  };

  return shuffledArray;
};