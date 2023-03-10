/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import cx from 'classnames';

import { InputProps, NumberInputProps } from '../Input/Input';
import { Option } from '../Select/Select';
import { StInput, StSelect, StInputSelectContainer } from './InputSelectStyled';

interface InputSelectValue {
  input: any;
  select: any;
}
export interface InputSelectProps
  extends Omit<InputProps, 'value' | 'onChange'>,
    Omit<NumberInputProps, 'value' | 'onChange'> {
  onChange: (value: InputSelectValue) => void;
  options: Option[];
  placeholder?: string;
  value: InputSelectValue;
  wide?: boolean;
}

const InputSelect = forwardRef<HTMLInputElement, InputSelectProps>(
  (
    { className, error, onChange, options, placeholder, value, wide, ...rest },
    ref,
  ) => {
    const handleOnChange = (newValue: InputSelectValue) => {
      onChange?.(newValue);
    };

    return (
      <StInputSelectContainer
        className={cx({
          className,
          'form-field': true,
          'form-field--wide': wide,
          'form-field-parent': true,
        })}
        data-testid="input-select"
        hasError={!!error}
        wide={!!wide}
      >
        <StInput
          ref={ref}
          placeholder={placeholder}
          value={value.input}
          wide={!!wide}
          {...rest}
          onChange={(val) => {
            handleOnChange({ ...value, input: val });
          }}
        />
        <StSelect
          className="input-select__select"
          options={options}
          value={value.select}
          onChange={(val) => {
            handleOnChange({ ...value, select: val });
          }}
        />
      </StInputSelectContainer>
    );
  },
);

InputSelect.defaultProps = {
  placeholder: '',
  wide: false,
};

export default InputSelect;
