/**
 * @typedef {Object} Sound - The sound object with all
 * the sound properties.
 * @property {string} name - the name of the sound
 * @property {string} src - the source of the sound
 * @property {number} volume - the volume of the sound
 * @property {boolean=} loop - if the sound loops.
 */

/**
 * The coin sounds.
 * @type {Sound[]}
 */
export const soundCoin = [
  {
    name: 'coin',
    src: 'coin/collectible.wav',
    volume: 0.8,
  },
];
