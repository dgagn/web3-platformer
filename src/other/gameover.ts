import {emitterGame, emitterHome} from '../entities/emitter';
import {clearEngine} from '../core/engine';
import {time} from './time';
import {pauseMusic} from './gamestart';

export function eventTimerGameOver() {
  emitterGame.on('timer', () => {
    if (time === 1) emitterGame.emit('gameover');
  });
}

export function eventGameOver(game) {
  emitterGame.on('gameover', () => {
    clearEngine();
    pauseMusic();
    emitterHome.emit('modalopen', {
      name: game.entities.player.info,
      title: 'Recommencer',
    });
  });
}
