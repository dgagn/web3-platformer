import $ from 'jquery';
import {createCoinUI, createTimerUI, updateUi} from '../entities/ui';
import {engine} from './engine';
import {createPlayer, updatePlayer} from '../entities/player';
import {createCoin, updateCoins} from '../entities/coins';
import {createFloor, updateFloor} from '../entities/floor';
import {createPlatform, updatePlatform} from '../entities/platforms';

const createEntities = canvas => {
  const player = createPlayer();
  const timerUi = createTimerUI();
  const coinUi = createCoinUI();
  const floor = createFloor(canvas);

  const coin = () => createCoin(canvas);
  const platform = () => createPlatform(canvas);

  const coins = Array(1).fill(true).map(coin);
  const platforms = Array(10).fill(true).map(platform);

  return {
    player,
    timerUi,
    coinUi,
    floor,
    coin,
    platform,
    coins,
    platforms,
  };
};

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
