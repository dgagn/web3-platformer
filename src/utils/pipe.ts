import {curryN} from './curry';

export const pipe =
  (...fns) =>
    (x) =>
      fns.reduce((v, f) => f(v), x);

const _pipeWith = (x, ...fns) => pipe(...fns)(x);

export const pipeWith = curryN(2, _pipeWith);
