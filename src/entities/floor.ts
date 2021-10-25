import {update} from '../core/engine';
import {pipeWith} from '../utils';
import {tag} from '../core/tag';
import {physics, position, updatePhysics} from '../core/physics';
import {size} from '../core/size';
import {rectangle} from '../core/rectangle';

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
