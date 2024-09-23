/**
 * Checks if all values in an object or array are null.
 *
 * @param obj The object or array to check.
 * @returns true if all values are null, false otherwise.
 */
export default function allValuesNull(
  obj: { [key: string]: any } | any[]
): boolean {

  if (Array.isArray(obj)) {
    return obj.every(value => allValuesNull(value));

  } else if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).every(value => allValuesNull(value));

  } else {
    return obj === null;
  };
}