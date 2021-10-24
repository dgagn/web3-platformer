import {update} from '../core/engine';
import {pipeWith} from '../utils';
import {physics, rectangle, size, updatePhysics} from '../core';
import {tag} from '../core/tag';
import {position} from '../core/physics';

export function createFloor(canvas) {
  return pipeWith(
    {},
    tag('floor'),
    position([0, canvas.height - 20]),
    physics(),
    size(canvas.width, 20),
    rectangle
  );
}

export const updateFloor = update(({game}) => {
  game.entities.floor = pipeWith(
    game.entities.floor,
    updatePhysics(),
    rectangle
  );
});
