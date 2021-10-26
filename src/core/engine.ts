/**
 * @callback Engine
 * @typedef {Engine} Engine
 */

/**
 * @callback Update
 * @param {*} state - states to pass in
 * the update function.
 * @typedef {Update} Update
 */

/**
 * Creates a engine that runs the `fn` on every
 * animation frames.
 *
 * @param {Function} fn - the function to run on every frames.
 * @return {Engine} - the engine callback
 */
export function engine(fn) {
  let frame = 0;
  const cb = () => {
    requestAnimationFrame(cb);
    fn(~~frame);
    frame++;
  };
  return cb;
}

/**
 * Clears all the animation frames from the
 * window.
 */
export function clearEngine() {
  let id = window.requestAnimationFrame(() => {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
}

/**
 * Creates a update functions that takes in a function
 * and returns a entity callback with the parameter passed
 * in to all the functions.
 * @param {Function} fn
 * @return {Update} - the update functions with
 * a specified parameter called in the `fn`.
 */
export function update(fn) {
  return p2 => {
    fn(p2);
  };
}
