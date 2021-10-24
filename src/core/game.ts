import $ from 'jquery';
import {
  createCoin,
  createCoinUI,
  createFloor,
  createPlatform,
  createPlayer,
  createTimerUI,
} from '../scratch/t1';
import {engine} from './engine';
import {updatePlayer} from '../player';
import {updateCoins} from '../coins';
import {updateFloor} from '../floor';

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

    // @ts-ignore
    window.player2 = game.entities.player;
  })();

  return game;
}
