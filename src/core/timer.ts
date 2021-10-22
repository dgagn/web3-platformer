import {game} from './game';

export let time = 90; // in seconds
export function timer() {
  if (time === 0) {
    game.emit('gameover');
    return;
  }
  time--;
  setTimeout(timer, 1000);
}
