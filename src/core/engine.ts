import {startTimer} from './timer';

export function engine(fn) {
  let frame = 0;
  const cb = () => {
    requestAnimationFrame(cb);
    fn(~~frame);
    frame++;
  };
  return cb;
}

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
