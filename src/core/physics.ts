import Vec, {add, vector, scale, TVector} from './vector';

const physics =
  ({
    mass = 1,
    position = Vec.zero,
    velocity = Vec.zero,
    acceleration = Vec.zero,
  } = {}) =>
    (p: any = {}) => ({
      ...p,
      mass,
      position,
      velocity,
      acceleration,
    });

const updatePhysics =
  (friction: number = 0.1) =>
    (p) => {
      const [[px, py], [vx, vy], [ax, ay]] = [
        p.position,
        p.velocity,
        p.acceleration,
      ];
      const oldpos = vector(px, py);
      const [uvx, uvy] = vector(
          (vx + ax) * (1 - friction),
          (vy + ay) * (1 - friction),
      );
      return {
        ...p,
        position: vector(px + uvx, py + uvy),
        velocity: vector(uvx, uvy),
        acceleration: Vec.zero,
        oldpos,
      };
    };

const addForce =
  (force: TVector) =>
    ({mass, acceleration, ...p}) => ({
      ...p,
      acceleration: add(scale(force, mass), acceleration),
    });

export {physics, addForce, updatePhysics};

export default {
  addForce,
  updatePhysics,
  physics,
};
