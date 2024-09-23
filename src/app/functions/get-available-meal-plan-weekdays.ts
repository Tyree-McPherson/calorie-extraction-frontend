/**
 * Returns an array of weekdays where meals are available.
 *
 * @param {object} data - The data object containing meal information.
 * @param {object} data[day] - The meal information for a given day.
 * @returns {string[]} An array of weekdays where meals are available,
 *   in the format ["monday", "tuesday", ...].
 */
export default function getAvailableMealPlanWeekdays(data: any): string[] {
  const daysWithMeals: string[] = [];

  const weekdays = [
    "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday"
  ];

  weekdays.forEach((day) => {
    const meals = data[day];
    if (meals) {
      const hasMeals = Object.values(meals).some(
        (meal: any) => meal.item_one.name === null
      );

      if (hasMeals) daysWithMeals.push(day);
    };
  });

  return daysWithMeals;
};
