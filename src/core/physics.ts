import Vector, {add, scale, Vec, vector} from './vector';
import {curry, isDefined} from '../utils';

export const hasPhysics = obj =>
  [obj.mass, obj.position, obj.velocity, obj.acceleration, obj.oldpos].every(
    isDefined
  );

export const physics =
  ({mass = 1, velocity = Vector.zero, acceleration = Vector.zero} = {}) =>
  (obj = {}) => ({
    ...obj,
    mass,
    velocity,
    acceleration,
  });

export function position(position = Vector.zero, oldpos = Vector.zero) {
  return obj => ({
    ...obj,
    position,
    oldpos,
  });
}

export const updatePhysics =
  (friction: number = 0.1) =>
  obj => {
    if (!hasPhysics(obj)) {
      throw new Error('object must have physics properties');
    }

    const [[px, py], [vx, vy], [ax, ay]] = [
      obj.position,
      obj.velocity,
      obj.acceleration,
    ];
    const oldpos = vector(px, py);
    const [uvx, uvy] = vector(
      (vx + ax) * (1 - friction),
      (vy + ay) * (1 - friction)
    );
    return {
      ...obj,
      position: vector(px + uvx, py + uvy),
      velocity: vector(uvx, uvy),
      acceleration: Vector.zero,
      oldpos,
    };
  };

const _addForce = (force, obj) => {
  if (!hasPhysics(obj) || force.length !== 2) {
    throw new Error(
      'the object needs to have the physics properties ' +
        'and force needs to be a vector'
    );
  }

  return {
    ...obj,
    acceleration: add(scale(force, obj.mass), obj.acceleration),
  };
};

/**
 * Ajoute une acceleration sur un object de type physics
 * pour permettre l'objet de se déplacer.
 *
 * @function
 * @param {[number, number]} force - un vecteur pour la force
 * @param {Object=} obj - un objet pour appliquer
 * @return {(Function|Object)} - retourne un version `curried` de la fonction
 * ou un objet avec la force appliqué
 */
export const addForce = curry(_addForce);

export const gravity = (gravity: number) => obj => {
  if (!hasPhysics(obj)) {
    throw new Error('the object must have the physics properties');
  }
  return addForce(vector(0, gravity), obj);
};
