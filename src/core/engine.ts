export const engine = fn => {
  let timestamp = 0;
  // ignore coverage because request animation frame is not defined in node
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~(time - timestamp) / 1000);
    timestamp = time;
  };
  return cb;
};
