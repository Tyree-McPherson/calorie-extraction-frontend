import { capitalizeFirstLetter } from "./capitalize-first-letter";
import isLoggedIn from "./is-logged-in";

/**
 * Returns an array of objects, where each object contains an array of
 * exercises and the weekday name. The order of the weekdays is determined by
 * whether the user is logged in or not.
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
 *   of exercises and the weekday name.
 */
export default function orderDaysOfWeek(data: any): object[] {
  
  const userLoggedIn = isLoggedIn();
  let order: Array<string> = [];

  if (userLoggedIn) {
    
    order = [
      "monday", "tuesday", "wednesday", "thursday",
      "friday", "saturday", "sunday"
    ];

  } else {
    order = ["monday"];
  };

  return order.map(day => {
    const exercisesArray = [
      data[day].exercise_one,
      data[day].exercise_two,
      data[day].exercise_three,
      data[day].exercise_four
    ];
    return {
      exercises: exercisesArray,
      weekday: capitalizeFirstLetter(day)
    };
  });
};