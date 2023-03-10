import { textIncludes } from '../textIncludes';

describe('Helper textIncludes', () => {
  it('returns true even if text case does not match', () => {
    expect(textIncludes('abcd', 'ABC')).toBeTruthy();
  });

  it('returns false if text does not match', () => {
    expect(textIncludes('abcd', 'pef')).toBeFalsy();
  });
});
