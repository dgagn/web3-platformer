import {vector} from './vector';

/**
 * @callback KeyDown
 * @param key
 * @return {boolean} - returns a boolean if the key
 * is down
 * @typedef {KeyDown} KeyDown - the key down event
 */

/**
 * Creates a key manager with the events `keydown` and `keyup` setup.
 *
 * @return {Object} - the key manager with the key pressed
 */
function createKeyManager() {
  const keyManager = {};
  document.addEventListener('keydown', ({code}) => (keyManager[code] = true));
  document.addEventListener('keyup', ({code}) => delete keyManager[code]);
  return keyManager;
}

/**
 * Creates a key manager
 * @type {Object}
 */
const keyManager = createKeyManager();

/**
 * Initialize the button down pressed with a input manager.
 * @function
 * @param {InputManager} im - the input manager
 * @return {KeyDown} - if a function taking the key and
 * after boolean if the key is down
 */
export const initButtonDown = im => key => !!keyManager[im[key]];

/**
 * Creates the axis X and Y for a `input-manager`.
 * @function
 * @param {InputManager} im - the input manager
 * @return {Function} - the create axis function takes the
 * input manager
 */
export const createAxis = im => (leftKey, rightKey, jumpKey) => {
  const buttonDown = initButtonDown(im);
  const left = buttonDown(leftKey);
  const right = buttonDown(rightKey);
  const jump = buttonDown(jumpKey);
  return vector(left && right ? 0 : left ? -1 : right ? 1 : 0, jump ? -1 : 0);
};

export default {
  initButtonDown,
  createAxis,
};
