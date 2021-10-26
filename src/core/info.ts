/**
 * @typedef {Object} Info
 * @property {string} info - the name of the player
 */

/**
 * Gets the name of the player from the local storage.
 * @return {string} - the name of the player
 */
export function getPlayer() {
  return localStorage.getItem('player') ?? '';
}

/**
 * Sets the name of the player to the local storage.
 *
 * @param {string} name - the name of the player
 */
export function setPlayer(name) {
  localStorage.setItem('player', name);
}

/**
 * Creates a object with the info (name) of the
 * player from the local storage.
 *
 * @return {Info} - the object with the info property
 */
export function player() {
  return {
    info: getPlayer(),
  };
}
