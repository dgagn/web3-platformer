// ignore file coverage
export {physics, updatePhysics, addForce, hasPhysics, gravity} from './physics';
export {
  default as Vector,
  vector,
  scale,
  add,
  sub,
  dot,
  normalize,
  mag,
  dist,
  draw,
  text,
  mult,
} from './vector';
export {size, hasSize} from './size';
export {rectangle, hasRectangle} from './rectangle';
export {jumpable, hasJumpable, jump} from './jumpable';
export {hasMovable, movable, movement} from './movable';
export {
  collision,
  isBottomTopCollision,
  isTopBottomCollision,
  isRightLeftCollision,
  isLeftRightCollision,
  hasCollision,
} from './collision';
export {engine} from './engine';
