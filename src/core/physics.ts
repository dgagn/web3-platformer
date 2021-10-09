import Vec, {add, vector, scale, TVector} from './vector';
import {curry} from 'ramda';

type TPhysics = {
  position: TVector;
  velocity: TVector;
  acceleration: TVector;
  mass: number;
};

const physics = (
    mass: number = 1,
    position: TVector = Vec.zero,
    velocity: TVector = Vec.zero,
    acceleration: TVector = Vec.zero,
): TPhysics => ({
  position,
  velocity,
  acceleration,
  mass,
});

const _updatePhysics = <T extends TPhysics>(friction: number, phys: T): T => {
  let [[px, py], [vx, vy], [ax, ay]] = [
    phys.position,
    phys.velocity,
    phys.acceleration,
  ];

  [vx, vy] = vector((vx + ax) * (1 - friction), (vy + ay) * (1 - friction));

  return {
    ...phys,
    position: vector(px + vx, py + vy),
    acceleration: Vec.zero,
    velocity: vector(vx, vy),
  };
};

const _addForce = <T extends TPhysics>(force: TVector, phys: T): T => ({
  ...phys,
  acceleration: add(scale(force, phys.mass), phys.acceleration),
});

const addForce = curry(_addForce);
const updatePhysics = curry(_updatePhysics);

export {TPhysics, physics, addForce, updatePhysics};

export default {
  addForce,
  updatePhysics,
  physics,
};
