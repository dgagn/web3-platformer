export const curryN = (n: number, fn: Function) => {
  return function curried(...args: any[]) {
    return args.length >= n ?
      fn(...args) :
      (...next: any[]) => curried(...args.concat(next));
  };
};

export const curry = (fn) => curryN(fn.length, fn);
