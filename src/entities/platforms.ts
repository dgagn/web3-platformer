import {update} from '../core/engine';
import {pipe, pipeWith, random} from '../utils';
import {fromTopBoundsToBottom} from '../core/bounds';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {tag} from '../core/tag';
import {state} from '../core/state';
import {spritePlatform} from '../sprites/platform';
import {gravity, physics, position, updatePhysics} from '../core/physics';
import {size} from '../core/size';
import {rectangle} from '../core/rectangle';

export function createPlatform(canvas) {
  return pipeWith(
    {},
    tag('platform'),
    position([random(0, canvas.width), random(0, canvas.height)]),
    physics(),
    size(64, 16),
    rectangle,
    state(random(1, 2) === 1 ? 'idle' : 'idle_alt')(true),
    createAnimations(spritePlatform)
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

export function drawPlatforms({context, entities: {platforms}}) {
  platforms.forEach(platform => drawSprite(context, platform));
}
