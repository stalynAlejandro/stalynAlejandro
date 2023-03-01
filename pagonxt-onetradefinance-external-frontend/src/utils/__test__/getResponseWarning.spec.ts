import { getResponseWarning } from '../getResponseWarning';

describe('Util getResponseWarning', () => {
  it('returns the key of the response if it is a warning', () => {
    const warn = {
      key: 'warning-key',
      type: 'warning',
    };
    expect(getResponseWarning(warn as any)).toEqual(warn.key);
  });

  it('returns undefined if response is not a warning', () => {
    const warn = {
      key: 'warning-key',
      type: 'success',
    };
    expect(getResponseWarning(warn as any)).toBeUndefined();
  });

  it('returns undefined if response is not defined', () => {
    expect(getResponseWarning(undefined)).toBeUndefined();
  });
});
