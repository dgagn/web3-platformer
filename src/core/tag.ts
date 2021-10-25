export function hasTag(tag, obj) {
  return obj.tag === tag;
}

export function tag(name) {
  return obj => ({
    ...obj,
    tag: name,
  });
}
