import {emitterGame} from '../entities/emitter';

let time = 90;
emitterGame.on('timer', () => {
  time--;
  if (time <= 0) emitterGame.emit('gameover');
});
