import {vector} from './vector';

// todo: add unit test for inputs

const createKeyManager = () => {
  const keyManager = {};
  document.addEventListener('keydown', ({code}) => (keyManager[code] = true));
  document.addEventListener('keyup', ({code}) => delete keyManager[code]);
  return keyManager;
};

const keyManager = createKeyManager();

export const initButtonDown = im => key => !!keyManager[im[key]];

export const createAxis = im => (leftKey, rightKey, jumpKey) => {
  const buttonDown = initButtonDown(im);
  const left = buttonDown(leftKey);
  const right = buttonDown(rightKey);
  const jump = buttonDown(jumpKey);
  return vector(left && right ? 0 : left ? -1 : right ? 1 : 0, jump ? -1 : 0);
};

export default {
  initButtonDown,
  createAxis,
};
