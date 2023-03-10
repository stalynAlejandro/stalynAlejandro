import { arrayDiff } from '../arrayDiff';

describe('Util arrayDiff', () => {
  it('returns emtpy array if there are no differences between arrays', () => {
    const ar = ['a', 'b', 'c'];
    expect(arrayDiff(ar, ar)).toHaveLength(0);
  });

  it('returns differences between arrays when second array has greater length', () => {
    const ar = ['a', 'b', 'c'];
    const ar2 = ['b', 'c', 'd', 'e'];
    expect(arrayDiff(ar, ar2)).toEqual(['a', 'd', 'e']);
  });

  it('returns differences between arrays when first array has greater length', () => {
    const ar = ['a', 'b', 'c', 'd'];
    const ar2 = ['d', 'e', 'f'];
    expect(arrayDiff(ar, ar2)).toEqual(['a', 'b', 'c', 'e', 'f']);
  });

  it('returns first array if second one is not provided', () => {
    const ar = ['a', 'b', 'c'];
    expect(arrayDiff(ar, undefined)).toEqual(ar);
  });

  it('returns second array if first one is not provided', () => {
    const ar = ['a', 'b', 'c'];
    expect(arrayDiff(undefined, ar)).toEqual(ar);
  });
});
