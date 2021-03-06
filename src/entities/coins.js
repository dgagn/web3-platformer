import {pipe, pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {vector} from '../core/vector';
import {rectangle} from '../core/rectangle';
import {size} from '../core/size';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {spriteCoin} from '../sprites/coin';
import {createSounds} from '../core/sound';
import {update} from '../core/engine';
import {position} from '../core/physics';
import {emitterGame} from './emitter';
import {destroy, isDestroyed} from '../core/destroy';
import {createArray} from '../utils/lang';
import {soundCoin} from '../sounds/coin';

/**
 * Creates the coin entity.
 *
 * @param {HTMLCanvasElement} canvas - the game canvas
 * @return {Object} - the coin entity
 */
export function createCoin(canvas) {
  return pipeWith(
    {},
    tag('coin'),
    position(
      vector(random(10, canvas.width - 30), random(10, canvas.height - 50))
    ),
    size(16, 16),
    state(random(1, 2) == 1 ? 'idle' : 'idle_alt', true),
    rectangle,
    createAnimations(spriteCoin),
    createSounds(soundCoin)
  );
}

/**
 * Updates the coin every frame.
 * @function
 * @type {Update}
 */
export const updateCoins = update(({game, frames}) => {
  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));
  game.entities.coins = game.entities.coins.map(coinUpdate).filter(isDestroyed);
});

/**
 * Draws the coin every frame.
 *
 * @type {Update}
 */
export function drawCoins({context, entities: {coins}}) {
  coins.forEach(coin => drawSprite(context, coin));
}

/**
 * Collects the coin and listen on the `trigger` event to
 * compare to the coin tag.
 *
 * @param {Object} game - the game object
 */
export function eventCollectCoins(game) {
  const maxCoins = 50;

  emitterGame.on('trigger', ({collider, obj}) => {
    if (collider.tag !== 'coin' || obj.tag !== 'player') {
      return;
    }
    emitterGame.emit('score', 1);
    collider.sounds
      .filter(sound => sound.name === 'coin')[0]
      ?.audio?.play()
      .catch(e => e);

    destroy(collider);

    const withoutCoin = game.entities.coins.filter(isDestroyed);
    const newCoinOnCollect = withoutCoin.length < maxCoins ? 2 : 0;
    const newCoins = createArray(newCoinOnCollect).map(game.entities.coin);

    game.entities.coins = [...withoutCoin, ...newCoins];
  });
}
