import {emitterGame} from '../entities/emitter';

export let time = 0;
export function eventTime(game) {
  time = game.maxTime;
  emitterGame.on('timer', () => {
    time--;
  });
}
