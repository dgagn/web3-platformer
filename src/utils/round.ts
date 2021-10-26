/**
 * Rounds a value with a given precision.
 *
 * @param {number} num - the number to round
 * @param {number=} precision - the precision defaults to `2` if not provided
 * @return {number} - a rounded number with the given `precision`
 */
export function round(num, precision = 2) {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, precision)) /
    Math.pow(10, precision)
  );
}
