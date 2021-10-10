import {vector} from './vector';

const haveCollision = (rec1, rec2) => {
  return !(
    rec1.bottom < rec2.top ||
    rec1.top > rec2.bottom ||
    rec1.left > rec2.right ||
    rec1.right < rec2.left
  );
};

const collision = (rec) => (p) => {
  if (!haveCollision(p, rec)) return p;
  const {width, height} = p;
  const [px, py] = p.position;
  const [vx, vy] = p.velocity;

  if (p.bottom >= rec.top && p.oldbottom < rec.oldtop) {
    return {
      ...p,
      position: vector(px, rec.top - 0.1 - height),
      velocity: vector(vx, rec.velocity[1]),
      isGrounded: true,
    };
  } else if (p.top <= rec.bottom && p.oldtop > rec.oldbottom) {
    return {
      ...p,
      position: vector(px, rec.bottom + 0.1),
      velocity: vector(vx, rec.velocity[1]),
    };
  } else if (p.right >= rec.left && p.oldright < rec.oldleft) {
    return {
      ...p,
      position: vector(rec.left - 0.1 - width, py),
      velocity: vector(rec.velocity[0], vy),
    };
  } else if (p.left <= rec.right && p.oldleft > rec.oldright) {
    return {
      ...p,
      position: vector(rec.right + 0.1, py),
      velocity: vector(rec.velocity[0], vy),
    };
  }
  return p;
};

export {haveCollision, collision};