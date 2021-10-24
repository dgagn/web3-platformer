import {emitterGame} from '../entities/emitter';

export function startTimer() {
  emitterGame.emit('timer');
  setTimeout(startTimer, 1000);
}
