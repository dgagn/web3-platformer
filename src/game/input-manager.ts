import initButtonDown from '../core/inputs';
import vector from '../core/vector';

const inputManager = {
  jump: 'Space',
  left: 'KeyA',
  right: 'KeyD',
};

export const getButtonDown = initButtonDown(inputManager);

export const getAxisX = () => {
  const left = getButtonDown('left');
  const right = getButtonDown('right');
  return left && right ? 0 : left ? -1 : right ? 1 : 0;
};

export const getAxisY = () => (getButtonDown('jump') ? -1 : 0);

export const getAxis = () => vector(getAxisX(), getAxisY());

export default {
  getAxisX,
  getAxisY,
  getButtonDown,
  getAxis,
};
