import {vector, scale} from '../core/vector';
import Input from './input-manager';
import {addForce} from '../core/physics';
import {curry} from 'ramda';

function hasCollisionWith(r1, r2) {
  const [[r1x, r1y], [r2x, r2y]] = [r1.position, r2.position];
  if (r1x >= r2x + r2.width) {
    return false;
  } else if (r1x + r1.width <= r2x) {
    return false;
  } else if (r1y >= r2y + r2.height) {
    return false;
  } else if (r1y + r1.height <= r2y) {
    return false;
  }
  return true;
}

export const forceCollision = curry((r1, r2) => {
  if (hasCollisionWith(r1, r2)) {
    return {
      ...r2,
      isGrounded: true,
      position: vector(r2.position[0], ~~(r1.position[1] - r2.height)),
      acceleration: vector(r2.acceleration[0], 0),
    };
  }
  return {...r2, isGrounded: false};
});

export const jump = curry((jumpForce, p) => {
  if (p.isGrounded) {
    return addForce(scale(vector(0, Input.getAxisY()), jumpForce))(p);
  }
  return p;
});
