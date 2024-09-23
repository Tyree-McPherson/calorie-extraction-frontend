import isLoggedIn from "./is-logged-in";

/**
 * Returns an array of total calorie gains/losses per weekday based on the data
 * passed in.
 *
 * If the user is logged out, the function will only consider the "monday" data
 * and return an array with one element.
 *
 * @param {object} data The data to base the calorie gain/loss calculation on.
 * @returns {number[]} An array of total calorie gains/losses per weekday.
 */
export default function calculateCalorieGainLoss(data: any) {
  
  const userLoggedIn = isLoggedIn();
  let weekDaysOrder: any = [];

  if (!userLoggedIn) {
    
    weekDaysOrder = ["monday"];

  } else {
    
    weekDaysOrder = [
      "monday", "tuesday", "wednesday", "thursday",
      "friday", "saturday", "sunday"
    ];
  };
  
  return weekDaysOrder.map((weekday: string | number) => {

    const document: any = data[weekday];
    let totalCalories = 0;

    // Calorie gain (my meal plan).
    if (document.breakfast) {
      for (const mealType in document) {
        const meal = document[mealType];
        for (const item in meal) {
          totalCalories += meal[item].calories ?? 0;
        };
      };
    };

    // Calorie loss (my routine).
    if (document.exercise_one) {
      for (const exercise in document) {
        totalCalories += document[exercise].calories ?? 0;
      };
    };

    return totalCalories;
  });
};