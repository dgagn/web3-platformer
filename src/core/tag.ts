/**
 * Checks for tag properties.
 * @param {string} tag - the tag
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has tag
 * properties
 */
export function hasTag(tag, obj) {
  return obj.tag === tag;
}

/**
 * Tags a entity to be able to identify them easily.
 *
 * @param {string} name - the name of the tag
 * @return {EntityCB}
 */
export function tag(name) {
  return obj => ({
    ...obj,
    tag: name,
  });
}
