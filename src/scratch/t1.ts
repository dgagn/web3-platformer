import {pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {jumpable, movable, physics, rectangle, size} from '../core';
import {state} from '../core/state';
import {createAnimations} from '../core/animation';
import {playerSprite} from '../player/sprites';
import {coinSound, createSound} from '../core/sound';
import {playerSound} from '../player/sounds';
import {coinSprite} from '../coins/sprites';
import {uiSprite} from '../sprites/ui';
import {platformSprite} from '../sprites/platform';

export function createPlayer() {
  return pipeWith(
    {},
    tag('player'),
    physics({position: [48, 48]}),
    size(32, 50),
    state('idle', true),
    jumpable(14),
    movable(1),
    rectangle,
    createAnimations(playerSprite),
    createSound(playerSound)
  );
}

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

export function createTimerUI() {
  return pipeWith(
    {},
    physics({position: [48, 48]}),
    size(24, 24),
    state('timer', true),
    createAnimations(uiSprite)
  );
}

export function createCoinUI() {
  return pipeWith(
    {},
    physics({position: [48, 100]}),
    size(24, 24),
    state('coin', true),
    createAnimations(uiSprite)
  );
}

export function createFloor(canvas) {
  return pipeWith(
    {},
    tag('floor'),
    physics({position: [0, canvas.height - 20]}),
    size(canvas.width, 20),
    rectangle
  );
}

export function createPlatform(canvas) {
  return pipeWith(
    {},
    tag('platform'),
    physics({
      position: [random(0, canvas.width), random(0, canvas.height)],
    }),
    size(64, 16),
    rectangle,
    state(random(1, 2) === 1 ? 'idle' : 'idle_alt')(true),
    createAnimations(platformSprite)
  );
}
