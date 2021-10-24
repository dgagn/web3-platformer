import {random} from '../utils';
import {addForce} from './physics';
import {vector} from './vector';

export function fromTopBoundsToBottom([bwidth, bheight]) {
  return obj =>
    obj.bottom <= 0
      ? {
          ...obj,
          position: [random(0, bwidth - obj.width), bheight],
        }
      : obj;
}

export function constraintBounds([bwidth, bheight]) {
  return obj => {
    if (obj.right >= bwidth) {
      return addForce(vector(-10, 0), obj);
    }
    if (obj.left <= 0) {
      return addForce(vector(10, 0), obj);
    }
    if (obj.top <= 0) {
      return {
        ...obj,
        position: [random(0, bwidth - obj.width - 20), bheight - 100],
        velocity: [0, 0],
        acceleration: [0, 0],
      };
    }
    return obj;
  };
}
