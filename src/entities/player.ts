import {update} from '../core/engine';
import {pipe, pipeWith} from '../utils';
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
import Input from '../core/input-manager';
import {coinCollision, collisionTrigger} from '../core/collision';
import {constraintBounds} from '../core/bounds';
import {
  stateFalling,
  stateIdle,
  stateJumping,
  stateRunning,
} from '../core/state-manager';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {createSound, playSoundOnState} from '../core/sound';
import {hasTag, tag} from '../core/tag';
import {state} from '../core/state';
import {spritePlayer} from '../sprites/player';
import {soundPlayer} from '../sounds/player';
import {position} from '../core/physics';
import {emitter} from '../core/emitter';
import {emitterGame} from './emitter';
import {player} from '../core/name';

export function createPlayer() {
  return pipeWith(
    player(),
    tag('player'),
    position([48, 48]),
    physics(),
    size(32, 50),
    state('idle', true),
    jumpable(14),
    movable(1),
    rectangle,
    createAnimations(spritePlayer),
    createSound(soundPlayer)
  );
}

export const updatePlayer = update(
  ({game, frames}) =>
    (game.entities.player = pipeWith(
      game.entities.player,
      updatePhysics(0.1),
      movement(Input.getAxisX()),
      jump(Input.getAxisY()),
      gravity(1),
      rectangle,
      pipe(...game.entities.platforms.map(collision)),
      collision(game.entities.floor),
      pipe(...game.entities.coins.map(collisionTrigger)),
      constraintBounds(game.canvas),
      stateIdle,
      stateRunning(2),
      stateJumping(-10),
      stateFalling(5),
      unsafeUpdateAnimation(~~frames),
      playSoundOnState('running')
    ))
);

export function drawPlayer(game) {
  const {
    context,
    entities: {player},
  } = game;
  const [vx] = player.velocity;
  const [sw, sh] = player.animation.localSize;
  const [fpx, fpy] = player.animation.position;

  if (vx < 0) {
    context.save();
    context.translate(fpx + sw / 2, fpy + sh / 2);
    context.scale(-1, 1);
    context.translate(-(fpx + sw / 2), -(fpy + sh / 2));
  }
  context.strokeStyle = '#4e62e0';
  drawSprite(context, player);
  context.restore();

  // @ts-ignore
  window.player = player;
}

emitterGame.on('jump', obj => {
  if (!hasTag('player', obj)) {
    return;
  }
  obj.sounds.filter(sound => sound.state === 'jumping')[0].audio.play();
});
