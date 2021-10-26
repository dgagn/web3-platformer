import {emitterGame} from '../entities/emitter';

/**
 * The time left of the game.
 * @type {number}
 */
export let time = 0;

/**
 * Updates the time left of the game.
 * @param {Object} game - the game object
 */
export function eventTime(game) {
  time = game.maxTime;
  emitterGame.on('timer', () => {
    time--;
  });
}
