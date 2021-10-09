type InputManager = {};

const createKeyManager = () => {
  const keyManager = {};
  document.addEventListener('keydown', ({code}) => (keyManager[code] = true));
  document.addEventListener('keyup', ({code}) => delete keyManager[code]);
  return keyManager;
};

const keyManager = createKeyManager();

const initializeButtonDown = (im: InputManager) => (key: string) =>
  !!keyManager[im[key]];

export default initializeButtonDown;
