/* eslint-disable */
const curry = (fn: Function, arity: number): Function =>
  function curried() {
    if (arity == null) {
      arity = fn.length;
    }
    const args = [].slice.call(arguments);
    return args.length >= arity
      ? fn.apply(this, args)
      : function () {
          return curried.apply(this, args.concat([].slice.call(arguments)));
        };
  };

export default curry;
