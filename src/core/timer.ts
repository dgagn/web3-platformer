import {emitterGame} from '../entities/emitter';

export function timer() {
  emitterGame.emit('timer');
  setTimeout(timer, 1000);
}
