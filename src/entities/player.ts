import {pipe, pipeWith} from '../utils';
import {tag} from '../core/tag';
import {
  collision,
  gravity,
  jump,
  jumpable,
  movable,
  movement,
  physics,
  rectangle,
  size,
  updatePhysics,
} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {holySprite, mrManSprite, playerSprite} from '../player/sprites';
import {createSound, playSoundOnState} from '../core/sound';
import {playerSound} from '../player/sounds';
import {draw, update} from '../core/game';
import Input from '../game/input-manager';
import {coinCollision} from '../core/collision';
import {
  stateFalling,
  stateIdle,
  stateJumping,
  stateRunning,
} from '../player/states';
import {platforms} from './platforms';
import {floor} from './floor';
import {coins} from './coins';
import {gameBounds} from '../game/bounds';

export let player = pipeWith(
  {},
  tag('player'),
  physics({position: [48, 48]}),
  size(32, 50),
  state('idle', true),
  jumpable(14),
  movable(1),
  rectangle,
  createAnimations(mrManSprite),
  createSound(playerSound)
);

update(frames => {
  player = pipeWith(
    player,
    updatePhysics(0.1),
    movement(Input.getAxisX()),
    jump(Input.getAxisY()),
    gravity(1),
    rectangle,
    pipe(...platforms.map(collision)),
    collision(floor),
    pipe(...coins.map(coinCollision)),
    gameBounds,
    stateIdle,
    stateRunning(2),
    stateJumping(-10),
    stateFalling(5),
    unsafeUpdateAnimation(~~frames),
    playSoundOnState('running')
  );
});

draw(context => {
  const [vx] = player.velocity;
  const [sw, sh] = player.animation.localSize;
  const [fpx, fpy] = player.animation.position;
  // drawSprite(context, ui);

  if (vx < 0) {
    context.save();
    context.translate(fpx + sw / 2, fpy + sh / 2);
    context.scale(-1, 1);
    context.translate(-(fpx + sw / 2), -(fpy + sh / 2));
  }
  context.strokeStyle = '#4e62e0';
  drawSprite(context, player);
  context.restore();
});
