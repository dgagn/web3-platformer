import {vector} from './vector';
import {hasRectangle} from './rectangle';
import {emitter} from './emitter';
import {emitterGame} from '../entities/emitter';

/**
 * Permet de savoir si il y a une collision entre deux
 * rectangles.
 * @param {Object} rec1 - le premier rectangle
 * @param {Object} rec2 - le deuxième rectangle
 * @return {boolean} - un booléen pour savoir si il y a une
 * collision entre deux rectangles.
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
 * Permet de savoir si la collision est une collision de
 * type bas à haut.
 *
 * @example
 * // Un joueur en haut d'une plateforme
 * @param {Object} rec1 - le rectangle pour vérifier le bas
 * @param {Object} rec2 - le rectangle pour vérifier le haut
 * @return {boolean} - un booléen pour savoir si le rectangle est
 * en collision (le bas du rectangle 1 sur le haut du rectangle 2)
 */
export function isBottomTopCollision(rec1, rec2) {
  return rec1.bottom >= rec2.top && rec1.oldbottom < rec2.oldtop;
}

/**
 * Permet de savoir si la collision est une collision de
 * type haut à bas.
 *
 * @example
 * // Un joueur qui saute et a une collision avec le haut d'une
 * // plateforme
 * @param {Object} rec1 - le rectangle pour vérifier le haut
 * @param {Object} rec2 - le rectangle pour vérifier le bas
 * @return {boolean} - un booléen pour savoir si le rectangle est
 * en collision (le haut du rectangle 1 sur le bas du rectangle 2)
 */
export function isTopBottomCollision(rec1, rec2) {
  return rec1.top <= rec2.bottom && rec1.oldtop > rec2.oldbottom;
}

/**
 * Permet de savoir si la collision est une collision de
 * type droite à gauche.
 *
 * @example
 * // Un joueur qui saute et a une collision de droite avec le coté gauche
 * // d'une plateforme
 * @param {Object} rec1 - le rectangle pour vérifier la droite
 * @param {Object} rec2 - le rectangle pour vérifier la gauche
 * @return {boolean} - un booléen pour savoir si le rectangle est
 * en collision (la droite du rectangle 1 sur la gauche du rectangle 2)
 */
export function isRightLeftCollision(rec1, rec2) {
  return rec1.right >= rec2.left && rec1.oldright < rec2.oldleft;
}

/**
 * Permet de savoir si la collision est une collision de
 * type haut à bas.
 *
 * @example
 * // Un joueur qui saute et a une collision de gauche avec le coté droite
 * // d'une plateforme
 * @param {Object} rec1 - le rectangle pour vérifier la gauche
 * @param {Object} rec2 - le rectangle pour vérifier la droite
 * @return {boolean} - un booléen pour savoir si le rectangle est
 * en collision (la gauche du rectangle 1 sur la droite du rectangle 2)
 */
export function isLeftRightCollision(rec1, rec2) {
  return rec1.left <= rec2.right && rec1.oldleft > rec2.oldright;
}

export function collisionTrigger(rec) {
  return obj => {
    if (hasCollision(obj, rec)) {
      emitterGame.emit('trigger', {collider: rec, obj});
    }
    return obj;
  };
}

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
