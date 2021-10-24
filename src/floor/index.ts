import {pipe, pipeWith, random} from '../utils';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {update} from '../core/engine';
import {tag} from '../core/tag';
import {physics, rectangle, size, updatePhysics} from '../core';
import {state} from '../core/state';

export const updateFloor = update(({game}) => {
  game.entities.floor = pipeWith(
    game.entities.floor,
    updatePhysics(0.1),
    rectangle
  );
});
