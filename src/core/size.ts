export type TSize = {
  width: number;
  height: number;
};

const size = (width: number, height: number): TSize => ({
  width,
  height,
});

export default size;
