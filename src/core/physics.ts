import vector, {add, vec, scale, Vector} from './vector';

type Physics = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
};

const physics = (
    position: Vector = vec.zero,
    velocity: Vector = vec.zero,
    acceleration: Vector = vec.zero,
): Physics => ({
  position,
  velocity,
  acceleration,
});

export const updatePhysics = (phys: Physics, friction = 0.1) => {
  let [[px, py], [vx, vy], [ax, ay]] = [
    phys.position,
    phys.velocity,
    phys.acceleration,
  ];

  [vx, vy] = vector((vx + ax) * (1 - friction), (vy + ay) * (1 - friction));

  return {
    ...phys,
    position: vector(px + vx, py + vy),
    acceleration: vec.zero,
    velocity: vector(vx, vy),
  };
};

export const addForce = (phys: Physics, mass: number, force: Vector) => ({
  ...phys,
  acceleration: add(scale(force, mass), phys.acceleration),
});

export default physics;
