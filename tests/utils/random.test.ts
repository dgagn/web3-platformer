import {random} from 'utils';

describe('random', () => {
  it('should be a function', () => {
    expect(random).toBeInstanceOf(Function);
  });
  it('should take two arguments (min and max)', () => {
    expect(random.length).toEqual(2);
  });
  it('should return a random number between 1 and 5', () => {
    const randomNumber = random(1, 5);
    expect(randomNumber).toBeLessThanOrEqual(5);
    expect(randomNumber).toBeGreaterThanOrEqual(1);
  });
  it('should return random numbers in the negative', () => {
    const randomNumber = random(-5, 5);
    expect(randomNumber).toBeLessThanOrEqual(5);
    expect(randomNumber).toBeGreaterThanOrEqual(-5);
  });
});
