import {emitterGame} from '../entities/emitter';

export function startTimer() {
  return setInterval(() => {
    emitterGame.emit('timer');
  }, 1000);
}
