import { getSearchParamsWithValues } from '../getSearchParamsWithValue';

describe('Util getSearchParamsWithValue', () => {
  const params = {
    falsy: false,
    nl: null,
    num: 230,
    str: 'my param',
    truthy: true,
    und: undefined,
  };

  it('returns only truthy properties by default', () => {
    const res = Object.fromEntries(getSearchParamsWithValues(params));
    const resKeys = Object.keys(res);

    // URLSearchParams converts everything to string
    expect(res.num).toEqual(`${params.num}`);
    expect(res.str).toEqual(params.str);
    expect(res.truthy).toEqual(`${params.truthy}`);
    expect(res.falsy).toBeUndefined();

    expect(resKeys.length).toBe(3);
    expect(resKeys.includes('falsy')).toBeFalsy();
    expect(resKeys.includes('nl')).toBeFalsy();
    expect(resKeys.includes('und')).toBeFalsy();
  });

  it('includes falsy properties if includeFalse is set to true', () => {
    const res = Object.fromEntries(getSearchParamsWithValues(params, true));
    const resKeys = Object.keys(res);

    expect(res.falsy).toEqual(`${params.falsy}`);
    expect(resKeys.length).toBe(4);
  });

  it('does not return null properties, even with includeFalse property', () => {
    const resKeys = Object.keys(getSearchParamsWithValues(params, false));
    expect(resKeys.includes('nl')).toBeFalsy();
  });

  it('does not return undefined properties, even with includeFalse property', () => {
    const resKeys = Object.keys(getSearchParamsWithValues(params, false));
    expect(resKeys.includes('und')).toBeFalsy();
  });
});
