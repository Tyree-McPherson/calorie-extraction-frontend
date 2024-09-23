/**
 * Calculates the Body Mass Index (BMI) given the user's height and weight.
 * The formula used is BMI = weight (kg) / height (m)^2.
 * The height and weight can be in either metric or imperial units.
 *
 * @param {string} height - The user's height in the chosen unit of
 *   measurement.
 * @param {string} weight - The user's weight in the chosen unit of
 *   measurement.
 * @param {string} heightUnit - The unit of measurement for the height. Can be
 *   either 'cm' or 'inches'.
 * @param {string} weightUnit - The unit of measurement for the weight. Can be
 *   either 'kg' or 'lbs'.
 *
 * @returns {number} The user's Body Mass Index as a number rounded to one
 *   decimal place.
 */
export default function calculateBodyMassIndex(
  height: string, weight: string, heightUnit: string, weightUnit: string
): number {

  let heightInMeters: number;
  let weightInKilograms: number;

  const newHeight = parseInt(height);
  const newWeight = parseInt(weight);

  if (heightUnit === "cm") {

    // 1 meter = 100 centimeters.
    heightInMeters = newHeight / 100;

  } else {

    // 1 inch = 0.0254 meters.
    heightInMeters = newHeight * 0.0254;
  };

  // Convert weight to kilograms.
  if (weightUnit === "kg") {

    weightInKilograms = newWeight;
  
  } else {
    
    // 1 pound = 0.453592 kilograms.
    weightInKilograms = newWeight * 0.453592;
  };

  // Calculate the Body Mass Index.
  const bmi = weightInKilograms / (heightInMeters ** 2);
  
  // Round to one decimal place.
  return parseFloat(bmi.toFixed(1));
};
