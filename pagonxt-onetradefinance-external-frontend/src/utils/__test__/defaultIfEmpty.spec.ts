import { defaultIfEmpty } from '../defaultIfEmpty';

describe('Util defaultIfEmpty', () => {
  const defaultObject = { a: 'b', c: 'd' };
  it('returns the provided default data object if current object is empty', () => {
    expect(defaultIfEmpty({}, defaultObject)).toEqual(defaultObject);
  });

  it('returns the current object if it is not empty', () => {
    const currentObj = { p: 'd', z: 'k' };
    expect(defaultIfEmpty(currentObj, defaultObject)).toEqual(currentObj);
  });
});
