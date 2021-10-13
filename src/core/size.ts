export const hasSize = (obj) => !(!obj.width || !obj.height);

export const size = (width: number, height: number) => (obj) => ({
  ...obj,
  width,
  height,
});
