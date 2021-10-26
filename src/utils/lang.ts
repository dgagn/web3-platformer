/**
 * Checks if a specified value is defined.
 * @param {*} value - the value to verify
 * @return {boolean} - a boolean to assert if a variable is defined
 */
export function isDefined(value) {
  return typeof value !== 'undefined';
}

/**
 * Creates a array with `n` elements.
 * @param {number} elems - the number of elements of
 * the new array
 * @return {any[]} - the array of `n` elements
 */
export function createArray(elems) {
  return Array(elems).fill(true);
}
