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
  
  for (const key in meal) {
    if (meal[key] && meal[key]
      .hasOwnProperty('name') && meal[key].name === null) {
        return key;
    };
  };

  return false;
};
