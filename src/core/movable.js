import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';

/**
 * Checks for movable properties.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has movable
 * properties
 */
export function hasMovable(obj) {
  return isDefined(obj.speed);
}

/**
 * Adds the movable property to a entity.
 *
 * @param {number} speed - the speed of the entity
 * @return {EntityCB} - the entity callback with the
 * speed property
 */
export function movable(speed = 1) {
  return obj => ({
    ...obj,
    speed,
  });
}

/**
 * Updates the movement of a entity
 * @param {number} axisX - the x axis between -1 and 1
 * @return {EntityCB} - the entity callback with the updated
 * movement property
 */
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
