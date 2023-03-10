export const getSearchParamsWithValues = (
  params: any,
  includeFalse: boolean = false,
) => {
  const newParams: any = {};

  Object.keys(params).forEach((k) => {
    if (
      params[k] !== null &&
      params[k] !== undefined &&
      (params[k] !== false || includeFalse)
    ) {
      newParams[k] = params[k];
    }
  });

  return new URLSearchParams(newParams);
};
