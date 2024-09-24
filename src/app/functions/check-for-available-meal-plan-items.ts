/**
 * Iterates through the given meal object and returns the key of the first
 * meal item that has a name property equal to null. If no such item exists,
 * returns false.
 * @param meal
 * @returns {string | false}
 */
export default function checkForAvailableMealPlanItems(
  meal: any
): string | false {

  const orderedMeal: any = {
    item_one: meal.item_one,
    item_two: meal.item_two,
    item_three: meal.item_three
  };
  
  for (const key in orderedMeal) {
    if (orderedMeal[key] && orderedMeal[key]
      .hasOwnProperty('name') && orderedMeal[key].name === null) {
        return key;
    };
  };

  return false;
};
