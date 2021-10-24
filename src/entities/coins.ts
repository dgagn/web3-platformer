import {pipe, pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {rectangle, size, vector} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {spriteCoin} from '../sprites/coin';
import {createSound} from '../core/sound';
import {update} from '../core/engine';
import {position} from '../core/physics';
import {emitterGame} from './emitter';
import {destroy, isDestroyed} from '../core/collision';
import {createArray} from '../utils/lang';
import {soundCoin} from '../sounds/coin';

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
    createSound(soundCoin)
  );
}

export const updateCoins = update(({game, frames}) => {
  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));
  game.entities.coins = game.entities.coins.map(coinUpdate).filter(isDestroyed);
});

export function drawCoins({context, entities: {coins}}) {
  coins.forEach(coin => drawSprite(context, coin));
}

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
