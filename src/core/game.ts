import $ from 'jquery';
import {updateUi} from '../entities/ui';
import {engine} from './engine';
import {drawPlayer, updatePlayer} from '../entities/player';
import {collectCoins, drawCoins, updateCoins} from '../entities/coins';
import {updateFloor} from '../entities/floor';
import {drawPlatforms, updatePlatform} from '../entities/platforms';
import {createEntities} from './entities';
import {drawSprite} from './animation';
import {drawInitialSettings} from '../entities/utils';
import {drawBackground} from '../entities/background';

export function createGame(selector) {
  const canvas = $(selector).get(0);
  const context = canvas.getContext('2d');
  const entities = createEntities(canvas);

  const game = {
    canvas,
    context,
    entities,
  };

  collectCoins(game);

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
    drawSprite(context, game.entities.timerUi);
    drawSprite(context, game.entities.coinUi);

    // todo: ui is gross as fuck
    context.fillStyle = '#676670';
    context.font = '24px system-ui';
    context.fillText(`${0}`, 88, 68);
    context.fillText(`${0}`, 88, 120);

    context.fillStyle = '#381010';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    context.globalAlpha = 1;
  })();

  return game;
}
