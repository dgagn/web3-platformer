import {emitterGame} from '../entities/emitter';

/**
 * Emits the `timer` event every seconds
 * @return {NodeJS.Timer} - returns the id of the
 * handle on the `setInterval` to be able to `clearInterval`
 * later.
 */
export function startTimer() {
  return setInterval(() => {
    emitterGame.emit('timer');
  }, 1000);
}
