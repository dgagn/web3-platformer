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
import {coinCollision} from '../core/collision';
import {constraintBounds} from '../core/bounds';
import {
  stateFalling,
  stateIdle,
  stateJumping,
  stateRunning,
} from '../core/state-manager';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {createSound, playSoundOnState} from '../core/sound';
import {tag} from '../core/tag';
import {state} from '../core/state';
import {playerSprite} from '../sprites/player';
import {playerSound} from '../sounds/player';

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
      pipe(...game.entities.coins.map(coinCollision)),
      constraintBounds(game.canvas),
      stateIdle,
      stateRunning(2),
      stateJumping(-10),
      stateFalling(5),
      unsafeUpdateAnimation(~~frames),
      playSoundOnState('running')
    ))
);
