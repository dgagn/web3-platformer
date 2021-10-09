import {Physics} from './physics';
import {TSize} from './size';

export type TRectangle = TSize &
  Physics & {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

type Rectangle<T> = T & {};

const rectangle = <T extends TSize & Physics>(rec: T): Rectangle<T> => {
  const {width, height, position} = rec;
  const [px, py] = position;

  return {
    ...rec,
  };
};

export default rectangle;
