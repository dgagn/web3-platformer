import {map} from '../src/core/array';

describe('array', () => {
  describe('map', () => {
    it('should return a map function with arity of 2', () => {
      const mapper = map((_) => true);
      expect(typeof mapper).toBe('function');
    });
    it('should be able to be called with 2 parameters', () => {
      const mapper = map((_) => true, [0, 0]);
      expect(mapper).toStrictEqual([true, true]);
    });
    it('should be able to have a mapper called on multiple array', () => {
      const mapper = map((x) => x + 1);
      expect(mapper([1, 2, 3, 0, 1])).toStrictEqual([2, 3, 4, 1, 2]);
      expect(mapper(['hey', 'man'])).toStrictEqual(['hey1', 'man1']);
    });
  });
});
