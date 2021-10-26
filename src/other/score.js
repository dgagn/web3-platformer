import {emitterGame} from '../entities/emitter';

/**
 * The score of the player.
 * @type {number}
 */
export let score = 0;

/**
 * Updates the score when the event `score` is triggered.
 */
export function eventScore() {
  emitterGame.on('score', inc => {
    score += inc;
  });
}

/**
 * Resets the score to its initial value.
 */
export function resetScore() {
  score = 0;
}
