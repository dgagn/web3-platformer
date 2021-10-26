/**
 * Returns a curried version of a function with `n` arity.
 * @param {number} n - the number of arity the function has
 * @param {Function} fn - the function to `curry`
 * @return {any}
 */
export function curryN(n, fn) {
  return function curried(...args) {
    return args.length >= n
      ? fn(...args)
      : (...next) => curried(...args.concat(next));
  };
}

/**
 * Curries a function automatically with the `fn.length`
 * property applied.
 * @param {Function} fn - the function to `curry`
 * @return {*} - returns the `curried` version of the `fn`
 */
export function curry(fn) {
  return curryN(fn.length, fn);
}
