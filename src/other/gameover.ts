import {emitterGame, emitterHome} from '../entities/emitter';
import {clearEngine} from '../core/engine';
import {time} from './time';
import {pauseMusic} from './gamestart';
import {eventLeaderboard, getLeaderboard, isHighScore} from './leaderboard';
import {clearGame} from '../core/game';

export function eventTimerGameOver() {
  emitterGame.on('timer', () => {
    if (time === 1) emitterGame.emit('gameover');
  });
}

export function eventGameOver(game) {
  emitterGame.on('gameover', () => {
    clearGame(game);
    emitterGame.clear();
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    const isHigh = eventLeaderboard(game);
    const leaderboard = getLeaderboard();
    const position =
      leaderboard.findIndex(l => l.name === game.entities.player.info) + 1;
    emitterHome.emit('modalopen', {
      name: game.entities.player.info,
      title: 'Recommencer la partie',
      subtitle: isHigh
        ? `Vous être <mark>${position}</mark> dans le classement`
        : `Désolé, votre score n'est <mark>pas assez haut</mark>`,
      button: 'Recommencer',
      emoji: isHigh ? '🔥' : '❄️',
    });
  });
}
