/**
 * Takes a Goals object and returns an array of Goal objects, where
 * the order of the goals is determined by the order of the keys in the
 * orderedKeys array.
 *
 * @param {Goals} goals - The Goals object to order.
 * @returns {Goal[]} An array of Goal objects, ordered by the keys in
 *   the orderedKeys array.
 */
export default function orderGoals(goals: Goals): Goal[] {

  const orderedKeys = [
    "goal_one", "goal_two", "goal_three", "goal_four", "goal_five"
  ];
  const goalsArray: Goal[] = [];

  orderedKeys.forEach(key => {
    if (goals[key]) goalsArray.push(goals[key]);
  });

  return goalsArray;
};
