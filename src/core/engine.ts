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

export function clearEngine() {
  let id = window.requestAnimationFrame(() => {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
}

export function update(fn) {
  return p2 => {
    fn(p2);
  };
}
