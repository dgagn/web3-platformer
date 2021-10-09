import vector, {add, vec, scale, Vector} from './vector';

type Physics = {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  mass: number;
};

const physics = (
    mass: number = 1,
    position: Vector = vec.zero,
    velocity: Vector = vec.zero,
    acceleration: Vector = vec.zero,
): Physics => ({
  position,
  velocity,
  acceleration,
  mass,
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

export const addForce =
  (force: Vector) =>
    (phys: Physics): Physics => ({
      ...phys,
      acceleration: add(scale(force, phys.mass), phys.acceleration),
    });

export default physics;
