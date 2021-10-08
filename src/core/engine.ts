const engine = (fn) => {
  let timestamp = 0;
  const cb = (time: number = timestamp) => {
    requestAnimationFrame(cb);
    fn(~~(time - timestamp) / 1000);
    timestamp = time;
  };
  return cb;
};

export default engine;
