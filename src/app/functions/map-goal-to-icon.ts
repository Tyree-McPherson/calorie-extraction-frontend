/**
 * Maps a goal to a material design icon.
 *
 * @param {string} goal - The goal to map. Must be a valid key in the
 *   goalIconMap object.
 * @returns {string} The material design icon for the given goal.
 * @example
 *
 * mapGoalToIcon("Weight loss") // "monitor_weight"
 */
export default function mapGoalToIcon(goal: string): string {
  
  const goalIconMap: any = {
    "Weight loss": "monitor_weight",
    "Working out": "fitness_center",
    "Eating healthy": "restaurant",
    "Mindfulness": "psychology",
  };

  return goalIconMap[goal];
};
