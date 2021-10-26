import {isDefined} from '../utils';

/**
 * Checks for rectangle properties.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has rectangle
 * properties
 */
export function hasRectangle(obj) {
  return [
    obj.top,
    obj.bottom,
    obj.left,
    obj.right,
    obj.oldtop,
    obj.oldbottom,
    obj.oldleft,
    obj.oldright,
  ].every(isDefined);
}

/**
 * Adds the rectangle properties to a entity.
 * @param {Object} obj - the entity
 * @return {Object} - the entity object with the
 * rectangle properties
 */
export function rectangle(obj) {
  const [px, py] = obj.position;
  const [ox, oy] = obj.oldpos;
  const {width, height} = obj;

  return {
    ...obj,
    top: py,
    bottom: py + height,
    left: px,
    right: px + width,
    oldtop: oy,
    oldbottom: oy + height,
    oldleft: ox,
    oldright: ox + width,
  };
}
