export const engine = fn => {
  // ignore coverage because request animation frame is not defined in node
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~time);
  };
  return cb;
};
