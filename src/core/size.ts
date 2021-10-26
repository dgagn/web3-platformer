/**
 * Checks for size properties.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has size
 * properties
 */
export function hasSize(obj) {
  return !(!obj.width || !obj.height);
}

/**
 * Adds the size properties to a entity. **The size
 * properties affect the hitbox of the entity.**
 *
 * @param {number} width - the width of the entity
 * @param {number} height - the height of the entiy
 * @return {EntityCB} - the entity callback with
 * the size properties applied
 */
export function size(width, height) {
  return obj => ({
    ...obj,
    width,
    height,
  });
}
