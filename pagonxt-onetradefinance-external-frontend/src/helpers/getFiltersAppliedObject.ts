import { ApiFiltersResponseDto } from '../api/types/ApiFiltersResponseDto';
import { FilterValuesProps } from '../containers/FiltersModal/FiltersModal';

export const getFiltersAppliedObject = (
  originalFilters?: ApiFiltersResponseDto,
  filtersApplied: FilterValuesProps = {},
) => {
  if (!originalFilters || !filtersApplied) {
    return {};
  }

  const filtersAppliedObject: any = {};

  Object.keys(filtersApplied).forEach((fieldKey) => {
    const originalFilterField = originalFilters[fieldKey];

    if (originalFilterField) {
      const { type } = originalFilterField;
      const value = filtersApplied[fieldKey];

      filtersAppliedObject[fieldKey] = {
        type,
        ...(type === 'select' ? { values: value } : { value }),
      };
    }
  });

  return filtersAppliedObject;
};
