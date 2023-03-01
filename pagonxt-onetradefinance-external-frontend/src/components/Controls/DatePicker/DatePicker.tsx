import React, { useEffect, useState, forwardRef } from 'react';
import range from 'lodash/range';
import cx from 'classnames';
import { format, setMonth, getMonth, getYear } from 'date-fns';
import * as locales from 'date-fns/locale';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../Icon';
import { Input } from '../Input';
import {
  StCalendarContainer,
  StDatePickerContainer,
  StYearSelector,
} from './DatePickerStyled';
import { capitalizeFirst } from '../../../utils/capitalizeFirst';
import { FormField } from '../types/FormField';

interface DatePickerProps extends FormField, ReactDatePickerProps {
  disabled?: boolean;
  placeholder?: string;
}

const locale = 'es';

const CustomDatepickerHeader: React.FC<ReactDatePickerCustomHeaderProps> = ({
  changeYear,
  date,
  decreaseMonth,
  increaseMonth,
  nextMonthButtonDisabled,
  prevMonthButtonDisabled,
}) => {
  const months = new Array(12).fill(null).map((_, i) =>
    format(setMonth(new Date(), i), 'MMMM', {
      locale: locales[locale],
    }),
  );

  const years = range(1900, getYear(new Date()) + 10, 1).reverse();

  return (
    <div className="datepicker-custom-header">
      <div className="header-month-year-container">
        <div className="header-month-container">
          <Icon
            icon="chevron-left-bold"
            onClick={() => !prevMonthButtonDisabled && decreaseMonth()}
          />
          <span data-testid="datepicker-month">
            {capitalizeFirst(months[getMonth(date)])}
          </span>
          <Icon
            icon="chevron-right-bold"
            onClick={() => !nextMonthButtonDisabled && increaseMonth()}
          />
        </div>
        <StYearSelector
          options={years.map((year) => ({
            label: `${year}`,
            value: `${year}`,
          }))}
          value={`${getYear(date)}`}
          onChange={(val) => changeYear(val)}
        />
      </div>
    </div>
  );
};

const CustomDatepickerInput = forwardRef<HTMLInputElement, any>(
  // eslint-disable-next-line react/prop-types
  ({ disabled, error, id, onChange, onClick, placeholder, value }, ref) => (
    <Input
      ref={ref}
      data-testid="form-input-datepicker"
      disabled={disabled}
      error={error}
      icon="calendar"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(val) => onChange({ target: { value: val } })}
      onClick={onClick}
    />
  ),
);

const DatePicker: React.FC<DatePickerProps> = ({
  className = '',
  disabled,
  error = false,
  onChange,
  placeholder,
  value,
}) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    setSelectedDate(value ? new Date(value) : undefined);
  }, [value]);

  return (
    <StDatePickerContainer
      className={cx(className, 'form-field')}
      data-testid="date-picker"
    >
      <ReactDatePicker
        calendarContainer={StCalendarContainer}
        calendarStartDay={1}
        customInput={<CustomDatepickerInput error={error} />}
        dateFormat="dd/MM/yyyy"
        disabled={disabled}
        isClearable
        locale={locales[locale]}
        placeholderText={placeholder}
        renderCustomHeader={CustomDatepickerHeader}
        selected={selectedDate}
        todayButton={t('today')}
        useWeekdaysShort
        wrapperClassName="form-field-parent input-like"
        onChange={onChange}
      />
    </StDatePickerContainer>
  );
};

DatePicker.defaultProps = {
  disabled: false,
  placeholder: '',
};

export default DatePicker;
