import {TRectangle} from './rectangle';

const rectangleCollision = <T extends TRectangle, K extends TRectangle>(
  rec1: T,
  rec2: K,
): boolean => {
  return true;
};
