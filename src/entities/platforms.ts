import {pipe, pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {gravity, physics, rectangle, size, updatePhysics} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {platformSprite} from '../sprites/platform';
import {draw, game, update} from '../core/game';
import {stayTopBounds} from '../game/bounds';

const platform = () =>
  pipeWith(
    {},
    tag('platform'),
    physics({
      position: [random(0, game.canvas.width), random(0, game.canvas.height)],
    }),
    size(64, 16),
    rectangle,
    state(random(1, 2) === 1 ? 'idle_alt' : 'idle_alt', true), // todo: fix random if not touch
    createAnimations(platformSprite)
  );

export let platforms = Array(10).fill(true).map(platform);

update(() => {
  const platformUpdate = pipe(
    updatePhysics(0.1),
    gravity(-0.2),
    rectangle,
    stayTopBounds,
    unsafeUpdateAnimation(~~frames)
  );
  platforms = platforms.map(platformUpdate);
});

draw(context => {
  platforms.forEach(platform => drawSprite(context, platform));
});
