export function hasTag(tag, obj) {
  return obj.tag === tag;
}

export const tag = (name: string) => obj => ({
  ...obj,
  tag: name,
});
