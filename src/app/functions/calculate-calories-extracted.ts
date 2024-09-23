import exerciseMETsJson from "../json/exercise-mets.json";

/**
 * Calculates the number of calories extracted from the body given the
 * exercise, its duration, and the user's weight.
 *
 * @param {string} exercise - The type of exercise being performed. Must be a
 *   valid key in the exerciseMETsJson object.
 * @param {number} durationMinutes - The duration of the exercise in minutes.
 * @param {number} weightPounds - The user's weight in pounds.
 *
 * @returns {number} The number of calories extracted from the body, rounded to
 *   the nearest whole number.
 */
export default function calculateCaloriesExtracted(
  exercise: string, durationMinutes: number, weightPounds: number
): number {

  // If the "exercise" is a stretch or rest type, return 0.
  if (!exerciseMETsJson.hasOwnProperty(exercise)) return 0;

  const averageWeightKg = 68;
  const weightKg = (weightPounds * 0.453592) || averageWeightKg;
  const durationHours = durationMinutes / 60;
  const exerciseMETs: ExerciseMETs = exerciseMETsJson;
  const MET = exerciseMETs[exercise];
  const caloriesExtracted = MET * weightKg * durationHours;

  return Math.round(caloriesExtracted);
}