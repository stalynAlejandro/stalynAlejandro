import { getNumberFormatProps } from './getNumberFormatProps';

const numberFormatProps = getNumberFormatProps();

export const formatNumber = (
  number?: number | string | null,
  decimals: number = numberFormatProps.decimalScale,
  decimalPoint: string = numberFormatProps.decimalSeparator,
  thousandsSep: string = numberFormatProps.thousandSeparator,
) => {
  if (number === null || number === undefined) {
    return '';
  }

  const parsedNumber =
    typeof number === 'string' ? Number.parseFloat(number) : number;
  const n = !Number.isFinite(+parsedNumber) ? 0 : +parsedNumber;
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;

  const toFixedFix = (_n: number, _prec: number) => {
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    const k = 10 ** _prec;
    return Math.round(_n * k) / k;
  };

  const s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
};
