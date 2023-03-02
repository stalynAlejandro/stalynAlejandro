import React from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { DatePicker } from '../DatePicker';
import { Input } from '../Input';
import { Select } from '../Select';
import { Option } from '../Select/Select';
import { FormField } from '../types/FormField';
import { StDaysDateSelector } from './DaysDateSelectorStyled';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';

export interface DaysDateValue {
  date?: string;
  days?: string;
  type?: 'days' | 'date';
}

const MAX_DAYS = 366; // value < 366 days (a year) max

interface DaysDateSelectorProps extends FormField {
  onChange: (value: DaysDateValue) => void;
  placeholder?: string;
  value?: DaysDateValue;
}

const DaysDateSelector: React.FC<DaysDateSelectorProps> = ({
  className = '',
  error,
  onChange,
  placeholder,
  value,
}) => {
  const { t } = useTranslation();

  const typeOptions: Option[] = [
    {
      label: t('date'),
      value: 'date',
    },
    {
      label: t('days'),
      value: 'days',
    },
  ];

  return (
    <StDaysDateSelector
      className={cx(className, 'form-field--wide')}
      data-testid="days-date-selector"
    >
      <Select
        className={cx('daysDateSelector-typeSelect', 'form-field')}
        error={error}
        options={typeOptions}
        placeholder={placeholder}
        value={value?.type}
        onChange={(newType) => {
          onChange({ date: '', days: '', type: newType });
        }}
      />
      {value?.type === 'date' && (
        <DatePicker
          className={cx('daysDateSelector-datePicker', 'form-field')}
          error={error}
          placeholder={t('date')}
          value={value?.date}
          onChange={(newDate) => {
            onChange({ ...value, date: newDate?.toISOString() || '' });
          }}
        />
      )}
      {value?.type === 'days' && (
        <Input
          className={cx('daysDateSelector-daysInput', 'form-field')}
          decimalScale={0}
          error={error}
          isAllowed={(val) => getNumberFormatProps().isAllowed(val, MAX_DAYS)}
          placeholder={t('daysNumber')}
          type="number"
          value={value?.days}
          onChange={(newDays) => onChange({ ...value, days: newDays })}
        />
      )}
    </StDaysDateSelector>
  );
};

DaysDateSelector.defaultProps = {
  placeholder: '',
  value: undefined,
};

export default DaysDateSelector;
