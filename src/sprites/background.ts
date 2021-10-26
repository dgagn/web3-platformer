import {vector} from '../core/vector';

/**
 * @typedef {Object} Sprite - the sprite properties
 * @property {string} src - the source of the sprite
 * @property {Vector} position - a vector of the position
 * @property {Vector} size - the size of the sprite
 * @property {Vector} scale - a vector to scale the default size
 * @property {Vector=} offset - a offset for the sprite
 * @property {number=} current - the current sprite the
 * engine needs to render
 * @property {number=} steps - the number of steps
 * @property {string=} state - the state of the sprite
 * @property {number=} yoffset - the offset to apply to get the sprite
 * below
 */

/**
 * The backgrounds sprites.
 * @type {Sprite[]}
 */
export const spriteBackgrounds = [
  {
    src: 'wall.png',
    position: vector(0, 0),
    scale: vector(3, 3),
    size: vector(288, 208),
  },
  {
    src: 'cols.png',
    position: vector(0, 0),
    scale: vector(3, 3),
    size: vector(288, 208),
  },
];
