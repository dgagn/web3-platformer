import {pipe, pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {physics, rectangle, size} from '../core';
import {state} from '../core/state';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {coinSprite} from '../coins/sprites';
import {coinSound, createSound} from '../core/sound';
import {update} from '../core/engine';

export function createCoin(canvas) {
  return pipeWith(
    {},
    tag('coin'),
    physics({
      position: [random(10, canvas.width - 30), random(10, canvas.height - 50)],
    }),
    size(16, 16),
    state(random(1, 2) == 1 ? 'idle' : 'idle_alt', true),
    rectangle,
    createAnimations(coinSprite),
    createSound(coinSound)
  );
}

export const updateCoins = update(({game, frames}) => {
  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));
  game.entities.coins = game.entities.coins
    .map(coinUpdate)
    .filter(c => !c.destroyed);
});
