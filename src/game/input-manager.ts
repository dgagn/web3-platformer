import initButtonDown from '../core/inputs';
import {vector} from '../core/vector';

const inputManager = {
  jump: 'Space',
  left: 'KeyA',
  right: 'KeyD',
};

export const getButtonDown = initButtonDown(inputManager);

type AxisX = 1 | 0 | -1;
export const getAxisX = (): 1 | 0 | -1 => {
  const left = getButtonDown('left');
  const right = getButtonDown('right');
  return left && right ? 0 : left ? -1 : right ? 1 : 0;
};

type AxisY = -1 | 0;
export const getAxisY = () => (getButtonDown('jump') ? -1 : 0);

export const getAxis = (): [AxisX, AxisY] =>
  vector<AxisX, AxisY>(getAxisX(), getAxisY());

export default {
  getAxisX,
  getAxisY,
  getButtonDown,
  getAxis,
};
