import {createPlayer} from '../entities/player';
import {createCoinUI, createTimerUI} from '../entities/ui';
import {createFloor} from '../entities/floor';
import {createCoin} from '../entities/coins';
import {createPlatform} from '../entities/platforms';

/**
 * Creates all the entities in the game.
 *
 * @param {HTMLCanvasElement} canvas - the game canvas
 * @return {Object} - the entities list
 */
export function createEntities(canvas) {
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
}
