import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';

export const hasMovable = obj => isDefined(obj.speed);

export function movable(speed = 1) {
  return obj => ({
    ...obj,
    speed,
  });
}

export function movement(axisX) {
  return obj => {
    if (!hasMovable(obj) || !hasPhysics(obj)) {
      throw new Error(
        'object needs to have the movable and physics properties'
      );
    }

    return addForce(vector(axisX * obj.speed, 0), obj);
  };
}
