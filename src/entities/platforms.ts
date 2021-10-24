import {update} from '../core/engine';
import {pipe, pipeWith, random} from '../utils';
import {gravity, physics, rectangle, size, updatePhysics} from '../core';
import {fromTopBoundsToBottom} from '../core/bounds';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {tag} from '../core/tag';
import {state} from '../core/state';
import {platformSprite} from '../sprites/platform';

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

export const updatePlatform = update(({game, frames}) => {
  const platformUpdate = pipe(
    updatePhysics(0.1),
    gravity(-0.2),
    rectangle,
    fromTopBoundsToBottom(game.canvas),
    unsafeUpdateAnimation(~~frames)
  );
  game.entities.platforms = game.entities.platforms.map(platformUpdate);
});
