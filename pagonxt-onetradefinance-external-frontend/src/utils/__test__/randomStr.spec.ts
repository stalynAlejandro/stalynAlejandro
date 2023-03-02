import { randomStr } from '../randomStr';

describe('Util randomStr', () => {
  it('generates a random string when called', () => {
    const strA = randomStr();
    const strB = randomStr();
    const strC = randomStr();

    expect(strA).not.toEqual(strB);
    expect(strA).not.toEqual(strC);
    expect(strB).not.toEqual(strC);
  });

  it('generates a random string with the specified length', () => {
    const str = randomStr(10);
    expect(str.length).toBe(10);
  });
});
