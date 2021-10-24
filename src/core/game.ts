import $ from 'jquery';
import {updateUi} from '../entities/ui';
import {engine} from './engine';
import {updatePlayer} from '../entities/player';
import {updateCoins} from '../entities/coins';
import {updateFloor} from '../entities/floor';
import {updatePlatform} from '../entities/platforms';
import {createEntities} from './entities';

export function createGame(selector) {
  const canvas = $(selector).get(0);
  const context = canvas.getContext('2d');
  const entities = createEntities(canvas);

  const game = {
    canvas,
    context,
    entities,
  };

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

  return game;
}
