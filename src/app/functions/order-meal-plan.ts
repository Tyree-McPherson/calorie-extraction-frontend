import { capitalizeFirstLetter } from "./capitalize-first-letter";
import isLoggedIn from "./is-logged-in";

/**
 * Returns an array of objects, where each object contains an array of meals
 * and the weekday name. The order of the weekdays is determined by whether
 * the user is logged in or not.
 *
 * If the user is logged in, the order of the weekdays is:
 *   - Monday
 *   - Tuesday
 *   - Wednesday
 *   - Thursday
 *   - Friday
 *   - Saturday
 *   - Sunday
 *
 * If the user is not logged in, the order of the weekdays is:
 *   - Monday
 *
 * @param {object} data The data to order.
 * @returns {object[]} An array of objects, where each object contains an array
 *   of meals and the weekday name.
 */
export default function orderMealPlan(data: any): object[] {

  const userLoggedIn = isLoggedIn();
  let order = [];

  if (userLoggedIn) {

    order = [
      "monday", "tuesday", "wednesday", "thursday",
      "friday", "saturday", "sunday"
    ];
  } else {

    order = ["monday"];
  };

  return order.map(day => {
    const mealsArray = [
      {
        name: "Breakfast",
        data: [
          data[day].breakfast.item_one,
          data[day].breakfast.item_two,
          data[day].breakfast.item_three
        ],
      },
      {
        name: "Lunch",
        data: [
          data[day].lunch.item_one,
          data[day].lunch.item_two,
          data[day].lunch.item_three
        ],
      },
      {
        name: "Dinner",
        data: [
          data[day].dinner.item_one,
          data[day].dinner.item_two,
          data[day].dinner.item_three
        ],
      }
    ];
    return {
      meals: mealsArray,
      weekday: capitalizeFirstLetter(day)
    };
  });
};
