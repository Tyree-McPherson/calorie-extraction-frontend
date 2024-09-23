/**
 * Maps a number to its corresponding word representation.
 *
 * @param {number} number - The number to map.
 * @returns {string} The word representation of the number.
 */
export default function mapNumberToWord(number: number): string {
  const map: any = {
    0: "one",
    1: "two",
    2: "three",
    3: "four",
    4: "five",
  };
  
  return map[number];
};
