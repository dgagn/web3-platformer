import {createAxis, initButtonDown} from './input';

const inputManager = {
  jump: 'Space',
  left: 'KeyA',
  right: 'KeyD',
};

const getButtonDown = initButtonDown(inputManager);

const getAxis = () => createAxis(inputManager)('left', 'right', 'jump');
const getAxisX = () => getAxis()[0];
const getAxisY = () => getAxis()[1];

export {getButtonDown, getAxis, getAxisX, getAxisY};
export default {
  getButtonDown,
  getAxis,
  getAxisX,
  getAxisY,
};
