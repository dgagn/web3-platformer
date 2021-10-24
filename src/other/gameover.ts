import {emitterGame} from '../entities/emitter';
import {clearEngine} from '../core/engine';
import {time} from './time';

export function eventTimerGameOver(game) {
  emitterGame.on('timer', () => {
    if (time <= 1) emitterGame.emit('gameover');
  });
}

export function eventGameOver(game) {
  emitterGame.on('gameover', () => {
    clearEngine();
    // clearSounds();
  });
}
