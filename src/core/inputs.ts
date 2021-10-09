const createKeyManager = (): any => {
  const keyManager = {};
  document.addEventListener('keydown', ({code}) => (keyManager[code] = true));
  document.addEventListener('keyup', ({code}) => delete keyManager[code]);
  return keyManager;
};

const initializeButtonDown =
  (keyManager: any) =>
  <T>(im: T) =>
      (key: keyof T) =>
        !!keyManager[im[key]];

export default initializeButtonDown(createKeyManager());
