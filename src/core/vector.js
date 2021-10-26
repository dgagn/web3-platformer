/**
 * @typedef {number[]} Vector
 * @description the vector is represented with a `Tuple` of two
 * numbers [number, number].
 */

/**
 * Creates a vector with a `x` and a `y`.
 *
 * @param {number} x - the x value
 * @param {number} y - the y value
 * @return {Vector} - the new vector
 */
export function vector(x, y) {
  return [x, y];
}

/**
 * The zero vector (0, 0)
 * @type {Vector}
 */
const zero = vector(0, 0);
/**
 * The zero vector (0, 0)
 * @type {Vector}
 */
const up = vector(0, 1);
/**
 * The down vector (0, -1)
 * @type {Vector}
 */
const down = vector(0, -1);
/**
 * The left vector (-1, 0)
 * @type {Vector}
 */
const left = vector(-1, 0);
/**
 * The right vector (1, 0)
 * @type {Vector}
 */
const right = vector(1, 0);

/**
 * Scales a vector by a `scalar`.
 *
 * @param {Vector} vector - a vector to scale
 * @param {number} scalar - the scaling amount
 * @return {Vector} - the scaled vector
 */
export function scale([x, y], scalar) {
  return vector(scalar * x, scalar * y);
}

/**
 * Adds all the vectors together.
 *
 * @param {Vector[]} vx - all the vectors to add together
 * @return {Vector} - the result of the vector
 */
export function add(...vx) {
  return vx.reduce(
    ([ax, ay], [vx, vy]) => vector(ax + vx, ay + vy),
    vector(0, 0)
  );
}

/**
 * Subtracts all the vectors together.
 *
 * @param {Vector[]} vx - all the vectors to subtract together
 * @return {Vector} - the result of the vector
 */
export function sub(...vx) {
  return vx.reduce(([ax, ay], [vx, vy]) => vector(ax - vx, ay - vy));
}

/**
 * Multiplies all the vectors together.
 *
 * @param {Vector[]} vx - all the vectors to multiply together
 * @return {Vector} - the result of the vector
 */
export function mult(...vx) {
  return vx.reduce(
    ([ax, ay], [vx, vy]) => vector(ax * vx, ay * vy),
    vector(1, 1)
  );
}

export default {
  vector,
  zero,
  left,
  right,
  up,
  down,
  scale,
  add,
  sub,
};
