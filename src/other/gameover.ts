import {emitterGame, emitterHome} from '../entities/emitter';
import {time} from './time';
import {eventLeaderboard, getLeaderboard} from './leaderboard';
import {clearGame} from '../core/game';
import {resetScore, score} from './score';

/**
 * Emits the `gameover` event when the time is over.
 */
export function eventTimerGameOver() {
  emitterGame.on('timer', () => {
    if (time === 1) emitterGame.emit('gameover');
  });
}

/**
 * Formats the position number with french
 * syntactic meaning.
 *
 * @param {number} position - the position on the leaderboard
 * @return {string} - a html string of the formated
 * position on the leaderboard
 */
const formatNumber = position =>
  position === 1
    ? `premier`
    : `<span class="text-md">${position}</span><sup>ième</sup>`;

/**
 * Listens when the `gameover` event is fired and respond
 * with the steps to finish the game.
 * @param {Object} game - the game object
 */
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
      title: isHigh ? `Félicitation !` : 'Recommencer la partie',
      subtitle: isHigh
        ? `Vous êtes le <mark>${formatNumber(
            position
          )}</mark> dans le classement`
        : `Désolé, votre score n'est <mark>pas assez haut</mark>`,
      button: 'Recommencer',
      emoji: isHigh ? '🔥' : '❄️',
      info: isHigh
        ? `Score de <span class="text-primary-500">${score}</span>`
        : `Score de ${score}`,
    });
    resetScore();
  });
}
