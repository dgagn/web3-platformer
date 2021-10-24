import $ from 'jquery';
import {drawUi, updateUi} from '../entities/ui';
import {engine} from './engine';
import {drawPlayer, updatePlayer} from '../entities/player';
import {drawCoins, eventCollectCoins, updateCoins} from '../entities/coins';
import {updateFloor} from '../entities/floor';
import {drawPlatforms, updatePlatform} from '../entities/platforms';
import {createEntities} from './entities';
import {drawInitialSettings} from '../entities/utils';
import {drawBackground} from '../entities/background';
import {eventGameOver, eventTimerGameOver} from '../other/gameover';
import {startTimer} from './timer';
import {eventScore} from '../other/score';
import {eventTime} from '../other/time';

export function createGame(selector) {
  const canvas = $(selector).get(0);
  const context = canvas.getContext('2d');
  const entities = createEntities(canvas);

  const game = {
    canvas,
    context,
    entities,
    maxTime: 10,
  };

  startTimer();
  eventCollectCoins(game);
  eventTimerGameOver(game);
  eventGameOver(game);
  eventTime(game);
  eventScore();

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
    const {context} = game;

    drawInitialSettings(game);
    drawBackground(game);
    drawPlayer(game);
    drawCoins(game);
    drawPlatforms(game);
    drawUi(game);

    context.fillStyle = '#381010';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    context.globalAlpha = 1;
  })();

  return game;
}
