/**
 * Generates a random value between `min` and `max` inclusive.
 *
 * @param {number} min - the minimum random value
 * @param {number} max - the maximum random value
 * @return {number} - the random value between `min` and `max`.
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
