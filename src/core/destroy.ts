export function destroy(obj) {
  obj.destroyed = true;
}

export function isDestroyed(obj) {
  return !obj.destroyed;
}
