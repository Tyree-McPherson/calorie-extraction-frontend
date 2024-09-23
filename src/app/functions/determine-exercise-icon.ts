/**
 * Maps an exercise type to a material design icon.
 *
 * @param {string} exercise - The type of exercise. Must be a valid key in the
 *   exerciseIconMap object.
 * @returns {string} The material design icon for the given exercise type.
 */
export default function determineExerciseIcon(exercise: string): string {
  
  const exerciseIconMap: any = {
    "exercise": "fitness_center",
    "stretch": "accessibility",
    "rest": "self_improvement"
  };

  return exerciseIconMap[exercise];
};
