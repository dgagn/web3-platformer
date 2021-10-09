const createKeyManager = (): any => {
  const keyManager = {};
  document.addEventListener('keydown', ({code}) => (keyManager[code] = true));
  document.addEventListener('keyup', ({code}) => delete keyManager[code]);
  return keyManager;
};

const keyManager = createKeyManager();

const initializeButtonDown =
  <T>(im: T) =>
    (key: keyof T) =>
      !!keyManager[im[key]];

export default initializeButtonDown;
