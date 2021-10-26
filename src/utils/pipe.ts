import {curryN} from './curry';

/**
 * @callback Pipe
 * @param {*} x - anything to start with the composition
 * @return {*} - returns the `curried` function
 * @typedef {Pipe}
 */

/**
 * Performs a left-to-right function compostion.
 * This function returns a function with the
 * default value to pass to it.
 *
 * @param {Function[]} fns - the functions to run
 * in a composition manner.
 * @return {Pipe}
 */
export function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}

function _pipeWith(x, ...fns) {
  return pipe(...fns)(x);
}

/**
 * Performs a left-to-right function composition.
 * This function is a curried function and makes
 * sure the composition is ran with a default
 * value.
 *
 * @function
 * @param {*} x - the default value to pass to
 * the function composition.
 * @param {Function[]} fns - the functions to run
 * in a composition manner.
 * @returns {*} - returns the result of the
 * composition or the next step.
 * @type {*}
 */
export const pipeWith = curryN(2, _pipeWith);
