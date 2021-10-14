import {vector} from './vector';
import {hasRectangle} from './rectangle';

// todo: add a tagging system for all objects to detect collision on tag

export const hasCollision = (rec1, rec2) =>
  !(
    rec1.bottom < rec2.top ||
    rec1.top > rec2.bottom ||
    rec1.left > rec2.right ||
    rec1.right < rec2.left
  );

const isBottomTopCollision = (rec1, rec2) =>
  rec1.bottom >= rec2.top && rec1.oldbottom < rec2.oldtop;

const isTopBottomCollision = (rec1, rec2) =>
  rec1.top <= rec2.bottom && rec1.oldtop > rec2.oldbottom;

const isRightLeftCollision = (rec1, rec2) =>
  rec1.right >= rec2.left && rec1.oldright < rec2.oldleft;

const isLeftRightCollision = (rec1, rec2) =>
  rec1.left <= rec2.right && rec1.oldleft > rec2.oldright;

const collision = rec => obj => {
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

export {
  collision,
  isBottomTopCollision,
  isTopBottomCollision,
  isLeftRightCollision,
  isRightLeftCollision,
};
