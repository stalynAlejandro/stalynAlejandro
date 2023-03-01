export const getOptionId = (opt: any) => {
  if (!opt) {
    return undefined;
  }

  const t = typeof opt;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    return opt;
  }

  return opt.id || opt.name ? `${opt.id || opt.name}` : opt;
};
