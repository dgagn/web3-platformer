import {emitterGame} from '../entities/emitter';

export let score = 0;
export function eventScore() {
  emitterGame.on('score', inc => {
    score += inc;
  });
}

export function resetScore() {
  score = 0;
}
