import $ from 'jquery';
import {drawUi, updateUi} from '../entities/ui';
import {clearEngine, engine} from './engine';
import {drawPlayer, updatePlayer} from '../entities/player';
import {drawCoins, eventCollectCoins, updateCoins} from '../entities/coins';
import {updateFloor} from '../entities/floor';
import {drawPlatforms, updatePlatform} from '../entities/platforms';
import {createEntities} from './entities';
import {drawColorCorrect, drawInitialSettings} from '../entities/utils';
import {drawBackground} from '../entities/background';
import {eventGameOver, eventTimerGameOver} from '../other/gameover';
import {startTimer} from './timer';
import {eventScore} from '../other/score';
import {eventTime} from '../other/time';
import {pauseMusic, startMusic} from '../other/gamestart';

/**
 * Creates the game on the specified selector.
 *
 * @param {jQuery|string} selector - the canvas element or a selector
 * @return {Object} - the game object with the options
 */
export function createGame(selector) {
  const canvas = $(selector).get(0);
  const context = canvas.getContext('2d');
  const entities = createEntities(canvas);

  const handle = startTimer();

  const game = {
    canvas,
    context,
    entities,
    maxTime: 90,
    handle,
  };
  eventCollectCoins(game);
  eventTimerGameOver();
  eventGameOver(game);
  eventTime(game);
  eventScore();
  startMusic();

  engine(frames => {
    const obj = {
      game,
      frames,
    };
    updatePlayer(obj);
    updateCoins(obj);
    updateFloor(obj);
    updatePlatform(obj);
    updateUi(obj);
  })();

  engine(() => {
    drawInitialSettings(game);
    drawBackground(game);
    drawPlayer(game);
    drawCoins(game);
    drawPlatforms(game);
    drawUi(game);
    drawColorCorrect(game);
  })();

  return {
    game,
    handle,
  };
}

/**
 * Clears all the side effects from the game.
 *
 * @param {Object} game - the game object
 */
export function clearGame(game) {
  clearInterval(game.handle);
  clearEngine();
  pauseMusic();
}
