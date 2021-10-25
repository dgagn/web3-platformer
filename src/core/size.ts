export const hasSize = obj => !(!obj.width || !obj.height);

export function size(width: number, height: number) {
  return obj => ({
    ...obj,
    width,
    height,
  });
}
