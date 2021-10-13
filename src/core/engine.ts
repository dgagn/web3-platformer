type Fn = (time: number) => void;

export const engine = (fn: Fn) => {
  // ignore coverage because request animation frame is not resolved in jest
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~time);
  };
  return cb;
};
