/**
 * Returns an array of weekdays where exercises are available.
 *
 * @param {object} data - The data object containing exercise information.
 * @param {object} data[day] - The exercise information for a given day.
 * @returns {string[]} An array of weekdays where exercises are available,
 *   in the format ["monday", "tuesday", ...].
 */
export default function getAvailableExerciseWeekdays(data: any): string[] {
  const daysWithExercises: string[] = [];

  const weekdays = [
    "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday"
  ];

  weekdays.forEach((day) => {
    const exercises = data[day];
    if (exercises) {
      const hasExercise = Object.values(exercises).some(
        (exercise: any) => exercise.type === null
      );

      if (hasExercise) daysWithExercises.push(day);
    };
  });

  return daysWithExercises;
};
