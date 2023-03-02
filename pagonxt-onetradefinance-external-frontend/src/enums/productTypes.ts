const productTypes = {
  CLE: 'CLE',
  CLI: 'CLI',
} as const;

export default productTypes;

export const urlProductTypes = {
  cle: productTypes.CLE,
  cli: productTypes.CLI,
};

export type ProductTypes = typeof productTypes[keyof typeof productTypes];
