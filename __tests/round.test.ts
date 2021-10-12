import round from '../src/core/round';

describe('round', () => {
  it('should round a number to 2 decimals', () => {
    const rounder = round(10.213, 2);
    expect(rounder).toEqual(10.21);
  });
  it('should round a number to 3 decimals', () => {
    const rounder = round(1.12923, 3);
    expect(rounder).toEqual(1.129);
  });
  it('should round with 0 decimal', () => {
    const rounder = round(1.23312, 0);
    expect(rounder).toEqual(1);
  });
  it('should default to 2 decimals', () => {
    const rounder = round(1.2344);
    expect(rounder).toEqual(1.23);
  });
  it('should round to top number', () => {
    const rounder = round(1.299);
    expect(rounder).toEqual(1.3);
  });
});
