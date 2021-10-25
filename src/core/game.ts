import $ from 'jquery';
import {drawUi, updateUi} from '../entities/ui';
import {engine} from './engine';
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
import {startMusic} from '../other/gamestart';
import {eventLeaderboard} from '../other/leaderboard';

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
  eventTimerGameOver();
  eventGameOver(game);
  eventTime(game);
  eventScore();
  startMusic();
  eventLeaderboard(game);

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

  return game;
}
