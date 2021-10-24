export const engine = fn => {
  let frame = 0;
  // ignore coverage because request animation frame is not defined in node
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~frame);
    frame++;
  };
  return cb;
};

export const engine2 = fn => {
  // ignore coverage because request animation frame is not defined in node
  let id;
  const cb = (time?: number) => {
    id = requestAnimationFrame(cb);
    fn(~~time);
  };
  return [id, cb];
};

export function update(fn) {
  return p2 => {
    fn(p2);
  };
}
