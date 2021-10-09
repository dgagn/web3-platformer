const size = (width: number, height: number) => (p) => ({
  ...p,
  width,
  height,
});

export default size;
