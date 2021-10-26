import {curry, isDefined} from '../utils';

/**
 * Checks for state property.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has state
 * property
 */
export function hasState(obj) {
  return isDefined(obj.state);
}

/**
 * Change the state on a given boolean.
 *
 * @internal
 * @function
 * @param {string} key - the key of the state
 * @param {boolean} boolean - a boolean if the state should change
 * @param {Object} obj - the entity
 * @return {Object} - the entity
 */
const _state = (key, boolean, obj) => ({
  ...obj,
  state: boolean ? key : hasState(obj) ? obj.state : 'stateless',
});

/**
 * Changes the state on a given boolean. This function
 * is `curried`
 * @function
 * @see curry
 * @see _state
 */
export const state = curry(_state);
