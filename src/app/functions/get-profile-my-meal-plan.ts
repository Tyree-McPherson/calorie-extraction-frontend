/**
 * Returns an object with the food and calories for the given meal.
 *
 * If there is no meal plan for the given meal, the function will return an
 * object with "No meal plan for [meal]" as the food and an empty string as
 * the calories.
 *
 * @param {object} data The data object containing the meal plan information.
 * @param {string} meal The meal to get the information for.
 * @returns {object} An object with the food and calories for the given meal.
 */
export default function getProfileMyMealPlan(data: any, meal: string): {
  food: string;
  calories: string | number;
} {

  let food: string = "";
  let calories: number = 0;

  if (!data.item_one.name) {
    food = `No meal plan for ${meal}`;
  
  } else {

    food += data.item_one.name;
    calories += data.item_one.calories;

    if (data.item_two.name) {
      food += ` + ${data.item_two.name}`;
      calories += data.item_two.calories;
    };

    if (data.item_three.name) {
      food += ` + ${data.item_three.name}`;
      calories += data.item_three.calories;
    };
  };
  return {
    food: food,
    calories: calories ? calories + " calories" : ""
  };
}