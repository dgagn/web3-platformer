/**
 * Destroy a entity.
 *
 * @param {Object} obj - the entity to destroy
 */
export function destroy(obj) {
  obj.destroyed = true;
}

/**
 * Checks for the destroyed property
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity is destroyed
 */
export function isDestroyed(obj) {
  return !obj.destroyed;
}
