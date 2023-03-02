import { formatNumber } from '../formatNumber';
import { getNumberFormatProps } from '../getNumberFormatProps';

describe('Util formatNumber', () => {
  const numberFormatProps = getNumberFormatProps();
  const n = 123456789;

  it('applies getNumberFormatProps properties by default and returns the expected result', () => {
    const defaultN = formatNumber(n);
    const propsN = formatNumber(
      n,
      numberFormatProps.decimalScale,
      numberFormatProps.decimalSeparator,
      numberFormatProps.thousandSeparator,
    );

    expect(defaultN).toEqual(propsN);
    expect(defaultN).toEqual('123.456.789,00');
  });

  it('allows to tweak parameters', () => {
    const formattedN = formatNumber(n, 3, '-', '_');
    expect(formattedN).toEqual('123_456_789-000');
  });

  it('returns empty if no number is provided', () => {
    const formattedN = formatNumber();
    expect(formattedN).toEqual('');
  });
});
