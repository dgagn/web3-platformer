import {update} from '../core/engine';
import {pipeWith} from '../utils';
import {physics, rectangle, size, updatePhysics} from '../core';
import {tag} from '../core/tag';

export function createFloor(canvas) {
  return pipeWith(
    {},
    tag('floor'),
    physics({position: [0, canvas.height - 20]}),
    size(canvas.width, 20),
    rectangle
  );
}

export const updateFloor = update(({game}) => {
  game.entities.floor = pipeWith(
    game.entities.floor,
    updatePhysics(0.1),
    rectangle
  );
});
