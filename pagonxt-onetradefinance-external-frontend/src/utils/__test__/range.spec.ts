import { range } from '../range';

describe('Util range', () => {
  it('creates a range from start to length', () => {
    expect(range(2, 5)).toEqual([2, 3, 4, 5, 6]);
  });

  it('creates a range from 0 to start length if only one param is specified', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]); // length = 4
  });

  it('creates a range for start length to end', () => {
    expect(range(2, undefined, 5)).toEqual([0, 1]);
    expect(range(7, undefined, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('creates a range from start to length, stopping if end is reached', () => {
    expect(range(2, 5, 10)).toEqual([2, 3, 4, 5, 6]);
    expect(range(2, 5, 5)).toEqual([2, 3, 4, 5]);
  });
});
