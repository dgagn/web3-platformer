import {vector} from './vector';

const haveCollision = (rec1, rec2) =>
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

const collision = (rec) => (p) => {
  if (!haveCollision(p, rec)) return p;
  const {width, height} = p;
  const [px, py] = p.position;
  const [vx, vy] = p.velocity;

  if (isBottomTopCollision(p, rec)) {
    return {
      ...p,
      position: vector(px, rec.top - 0.1 - height),
      velocity: vector(vx, rec.velocity[1]),
      isGrounded: true,
    };
  }

  if (isTopBottomCollision(p, rec)) {
    return {
      ...p,
      position: vector(px, rec.bottom + 0.1),
      velocity: vector(vx, rec.velocity[1]),
    };
  }

  if (isRightLeftCollision(p, rec)) {
    return {
      ...p,
      position: vector(rec.left - 0.1 - width, py),
      velocity: vector(rec.velocity[0], vy),
    };
  }

  if (isLeftRightCollision(p, rec)) {
    return {
      ...p,
      position: vector(rec.right + 0.1, py),
      velocity: vector(rec.velocity[0], vy),
    };
  }

  return p;
};

export {
  haveCollision,
  collision,
  isBottomTopCollision,
  isTopBottomCollision,
  isLeftRightCollision,
  isRightLeftCollision,
};
