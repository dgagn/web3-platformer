import {vector} from './vector';
import {hasRectangle} from './rectangle';
import {emitterGame} from '../entities/emitter';

/**
 * Detect if their is a collision between two rectangles.
 *
 * @param {Object} rec1 - the first rectangle
 * @param {Object} rec2 - the second rectangle
 * @return {boolean} - a boolean value on the detection between
 * the first and the second rectangle.
 */
export function hasCollision(rec1, rec2) {
  return !(
    rec1.bottom < rec2.top ||
    rec1.top > rec2.bottom ||
    rec1.left > rec2.right ||
    rec1.right < rec2.left
  );
}

/**
 * If the collision is a bottom to top collision.
 *
 * @param {Object} rec1 - rectangle to verify the bottom
 * @param {Object} rec2 - rectangle to verify the top
 * @return {boolean} - a boolean to detect if
 * the bottom of rect 1 collided with the top of rec2
 */
export function isBottomTopCollision(rec1, rec2) {
  return rec1.bottom >= rec2.top && rec1.oldbottom < rec2.oldtop;
}

/**
 * If the collision is a top to bottom collision.
 * @param {Object} rec1 - rectangle to verify top
 * @param {Object} rec2 - rectangle to verify bottom
 * @return {boolean} - verify the top of rec1 on the bottom of
 * rec2
 */
export function isTopBottomCollision(rec1, rec2) {
  return rec1.top <= rec2.bottom && rec1.oldtop > rec2.oldbottom;
}

/**
 * If the collision is a right to left collision.
 *
 * @param {Object} rec1 - rectangle to verify right
 * @param {Object} rec2 - rectangle to verify left
 * @return {boolean} - a boolean to verify if rec1 collides by
 * the right with rec2 on the left
 */
export function isRightLeftCollision(rec1, rec2) {
  return rec1.right >= rec2.left && rec1.oldright < rec2.oldleft;
}

/**
 * If the collision is a left to right collision.
 *
 * @param {Object} rec1 - the rectangle to verify left
 * @param {Object} rec2 - the rectangle to verify right
 * @return {boolean} - a boolean to detect if rec1
 * collides with rec2 from left to right
 */
export function isLeftRightCollision(rec1, rec2) {
  return rec1.left <= rec2.right && rec1.oldleft > rec2.oldright;
}

/**
 * Detects a trigger collision. Doesn't apply any transformation, so
 * returns the object intact.
 * *Emits the `trigger` event when the entity triggers with another
 * entity.
 * @param {Object} rec - the rectangle to add the trigger collision
 * to
 * @return {EntityCB}
 */
export function collisionTrigger(rec) {
  return obj => {
    if (hasCollision(obj, rec)) {
      emitterGame.emit('trigger', {collider: rec, obj});
    }
    return obj;
  };
}

/**
 * The collision module calculates the correct
 * collision with a rectangle and computes the best
 * outcome when colliding.
 *
 * @param {Object} rec - the rectangle object you want
 * to look for collision
 * @return {EntityCB} - returns the entity with the calculated
 * position.
 */
export function collision(rec) {
  return obj => {
    if (!hasRectangle(obj) || !hasRectangle(rec)) {
      throw new Error('objects must have the rectangle properties');
    }

    if (!hasCollision(obj, rec)) return obj;

    const {width, height} = obj;
    const [[px, py], [vx, vy], [rvx, rvy]] = [
      obj.position,
      obj.velocity,
      rec.velocity,
    ];

    if (isBottomTopCollision(obj, rec)) {
      return {
        ...obj,
        position: vector(px, rec.top - 0.1 - height),
        velocity: vector(vx, rvy),
        isGrounded: true,
      };
    }

    if (isTopBottomCollision(obj, rec)) {
      return {
        ...obj,
        position: vector(px, rec.bottom + 0.1),
        velocity: vector(vx, rvy),
      };
    }

    if (isRightLeftCollision(obj, rec)) {
      return {
        ...obj,
        position: vector(rec.left - 0.1 - width, py),
        velocity: vector(rvx, vy),
      };
    }

    if (isLeftRightCollision(obj, rec)) {
      return {
        ...obj,
        position: vector(rec.right + 0.1, py),
        velocity: vector(rvx, vy),
      };
    }

    return obj;
  };
}
