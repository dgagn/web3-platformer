type Fn = (time: number) => void;

const engine = (fn: Fn) => {
  let timestamp = 0;
  const cb = (time: number = timestamp) => {
    requestAnimationFrame(cb);
    fn(~~(time - timestamp) / 16);
    timestamp = time;
  };
  return cb;
};

export default engine;
