import { Option } from '../components/Controls/Select/Select';
import { getOptionId } from '../utils/getOptionId';

export const isOptionSelected = (
  option: Option,
  value: any,
  valueKey?: string,
) => {
  if (valueKey) {
    return (
      value?.[valueKey] &&
      option?.value?.[valueKey] &&
      option.value[valueKey] === value[valueKey]
    );
  }

  return Array.isArray(value)
    ? value.some((val) => getOptionId(option.value) === getOptionId(val))
    : getOptionId(option.value) === getOptionId(value);
};
