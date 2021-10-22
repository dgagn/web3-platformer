export const engine = fn => {
  let frames = 0;
  // ignore coverage because request animation frame is not defined in node
  const cb = () => {
    requestAnimationFrame(cb);
    fn(~~frames);
    frames++;
  };
  return cb;
};
