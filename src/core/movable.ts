import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';

export const hasMovable = obj => isDefined(obj.speed);

export const movable =
  (speed: number = 1) =>
  obj => ({
    ...obj,
    speed,
  });

const js = new Audio('walk.wav');
js.volume = 0.4;

export const movement = axisX => obj => {
  if (!hasMovable(obj) || !hasPhysics(obj)) {
    throw new Error('object needs to have the movable and physics properties');
  }

  if (axisX !== 0 && obj.isGrounded) {
    js.play();
  }

  return addForce(vector(axisX * obj.speed, 0), obj);
};
