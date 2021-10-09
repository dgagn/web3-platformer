export type TRectangle = {
  width: number;
  height: number;
};

const rectangle = (width: number, height: number): TRectangle => ({
  width,
  height,
});

export {rectangle};
export default {
  rectangle,
};
