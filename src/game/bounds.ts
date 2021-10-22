import {addForce, hasRectangle, vector} from '../core';
import {random} from '../utils';
import {game} from '../core/game';

export const gameBounds = obj => {
  // rectangle checks for physics and size
  if (!hasRectangle(obj)) {
    throw new Error('the object must have the rectangle properties');
  }
  if (obj.right >= game.canvas.width) {
    return addForce(vector(-10, 0), obj);
  }
  if (obj.left <= 0) {
    return addForce(vector(10, 0), obj);
  }
  if (obj.top <= 0) {
    return {
      ...obj,
      position: [
        random(0, game.canvas.width - obj.width - 20),
        game.canvas.height - 100,
      ],
      velocity: [0, 0],
      acceleration: [0, 0],
    };
  }
  return obj;
};

export const stayTopBounds = obj => {
  if (obj.bottom <= 0) {
    return {
      ...obj,
      position: [random(0, game.canvas.width - obj.width), game.canvas.height],
    };
  }
  return obj;
};
