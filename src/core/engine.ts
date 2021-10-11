type Fn = (time: number) => void;

const engine = (fn: Fn) => {
  const cb = (time?: number) => {
    requestAnimationFrame(cb);
    fn(~~time);
  };
  return cb;
};

export default engine;
