import { hexToRgba } from '../hexToRgba';

describe('Util hexToRgba', () => {
  it('returns the expected result for the specified hexCode', () => {
    expect(hexToRgba('#333333', 0.2)).toEqual('rgba(51,51,51,0.2)');
  });

  it('returns the expected result when hexCode has only 3 characters', () => {
    expect(hexToRgba('#333 ', 0.8)).toEqual('rgba(51,51,51,0.8)');
  });

  it('returns the expected result if the hexCode has trailing spaces', () => {
    expect(hexToRgba(' #333333 ', 0.5)).toEqual('rgba(51,51,51,0.5)');
    expect(hexToRgba(' #333 ', 0.5)).toEqual('rgba(51,51,51,0.5)');
  });
});
