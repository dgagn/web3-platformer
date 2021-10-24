import {random} from '../utils';
import {addForce} from './physics';
import {vector} from './vector';

export function fromTopBoundsToBottom(canvas) {
  return obj =>
    obj.bottom <= 0
      ? {
          ...obj,
          position: [random(0, canvas.width - obj.width), canvas.height],
        }
      : obj;
}

export function constraintBounds(canvas) {
  return obj => {
    if (obj.right >= canvas.width) {
      return addForce(vector(-10, 0), obj);
    }
    if (obj.left <= 0) {
      return addForce(vector(10, 0), obj);
    }
    if (obj.top <= 0) {
      return {
        ...obj,
        position: [
          random(0, canvas.width - obj.width - 20),
          canvas.height - 100,
        ],
        velocity: [0, 0],
        acceleration: [0, 0],
      };
    }
    return obj;
  };
}
