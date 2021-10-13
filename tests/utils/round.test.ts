import {round} from 'utils';

describe('round', () => {
  it('should be a function', () => {
    expect(round).toBeInstanceOf(Function);
  });
  it('should round a number to two digits by default', () => {
    const num = round(1.523);
    expect(num).toEqual(1.52);
  });
  it('should round a number by three digits', () => {
    const num = round(1.2333, 3);
    expect(num).toEqual(1.233);
  });
  it('should round a number up when digit greater than 5', () => {
    const num = round(1.399);
    expect(num).toEqual(1.4);
  });
  it('should round a number to 5 digits', () => {
    const num = round(1.5959511, 5);
    expect(num).toEqual(1.59595);
  });
});
