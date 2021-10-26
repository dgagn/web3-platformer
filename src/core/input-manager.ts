import {createAxis, initButtonDown} from './input';

/**
 * @typedef {Object} InputManager - the input manager
 * @property {string} left - the key to move left
 * @property {string} right - the key to move right
 * @property {string} jump - the key to jump
 */

/**
 * The default input manager.
 *
 * @type {InputManager}
 */
const inputManager = {
  jump: 'Space',
  left: 'KeyA',
  right: 'KeyD',
};

/**
 * Creates a getter for the button down.
 *
 * @function
 * @param {string} key - the key
 * @return {boolean} - if the key is pressed or not
 * @type {KeyDown}
 */
const getButtonDown = initButtonDown(inputManager);

/**
 * Gets both axis X and Y.
 *
 * @function
 * @return {Vector} - a vector with [x, y]
 */
const getAxis = () => createAxis(inputManager)('left', 'right', 'jump');
/**
 * Gets axis X.
 *
 * @function
 * @return {Vector} - a vector with [x, y]
 */
const getAxisX = () => getAxis()[0];
/**
 * Gets axis Y.
 *
 * @function
 * @return {Vector} - a vector with [x, y]
 */
const getAxisY = () => getAxis()[1];

export {getButtonDown, getAxis, getAxisX, getAxisY};
export default {
  getButtonDown,
  getAxis,
  getAxisX,
  getAxisY,
};
