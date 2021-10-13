type Fn = (time: number) => void;

export const engine = (fn: Fn) => {
  // ignore coverage because request animation frame is not defined in node
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~time);
  };
  return cb;
};
