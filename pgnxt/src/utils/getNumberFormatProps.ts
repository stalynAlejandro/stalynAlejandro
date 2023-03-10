export const getNumberFormatProps = () => ({
  allowNegative: false,
  decimalScale: 2,
  decimalSeparator: ',',
  fixedDecimalScale: true,
  isAllowed: (values: any, max: number = 9999999999.99) =>
    values.formattedValue === '' || values.floatValue <= max,
  isNumericString: true,
  thousandSeparator: '.',
});
