import React, { forwardRef } from 'react';
import cx from 'classnames';
import { NumberFormatProps } from 'react-number-format';
import { useTranslation } from 'react-i18next';

import { FloatingPlaceholder } from '../FloatingPlaceholder';
import { FormField } from '../types/FormField';
import {
  StInputContainer,
  StInput,
  StNumberInput,
  StIcon,
} from './InputStyled';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>,
    FormField {
  'data-testid'?: string;
  format?: string;
  icon?: string;
  onChange: (val: string) => void;
  onClick?: () => void;
  placeholder?: string;
  wide?: boolean;
}

interface NormalInputProps extends InputProps {}

export interface NumberInputProps
  extends InputProps,
    Omit<
      NumberFormatProps,
      'onChange' | 'defaultValue' | 'type' | 'value' | 'format' | 'onClick'
    > {}

const Input = forwardRef<HTMLInputElement, NormalInputProps | NumberInputProps>(
  (
    {
      className = '',
      'data-testid': testId,
      disabled = false,
      error = false,
      format = undefined,
      icon,
      onChange,
      onClick,
      optional,
      placeholder,
      type,
      value = '',
      wide,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customInput, defaultValue, ...numberRest } =
      rest as NumberFormatProps; // Discard incompatible props between types

    return (
      <StInputContainer
        className={cx({
          [className]: className,
          'form-field': true,
          'has-error': !!error,
        })}
        data-testid="form-input-container"
        disabled={!!disabled}
        hasError={!!error}
        hasPlaceholder={!!placeholder}
        hasValue={!!value}
        wide={!!wide}
        onClick={onClick}
      >
        {((type === 'number' || type === 'date') && (
          <StNumberInput
            data-testid={testId || 'form-input-numeric'}
            {...(type === 'number' ? getNumberFormatProps() : {})}
            disabled={disabled}
            format={format}
            value={`${value || ''}`}
            onValueChange={({ value: val }) => onChange(val)}
            {...numberRest}
          />
        )) || (
          <StInput
            data-testid={testId || 'form-input'}
            disabled={disabled}
            type={type}
            value={value}
            onChange={({ target: { value: val } }) => onChange(val)}
            {...rest}
            ref={ref}
          />
        )}
        <FloatingPlaceholder
          className="input-placeholder"
          isFloating={!!value}
          wide={!!wide}
        >
          {placeholder}
          {optional && ` ${t('fieldOptional')}`}
        </FloatingPlaceholder>
        {icon && <StIcon className="input-icon" icon={icon} size={22} />}
      </StInputContainer>
    );
  },
);

Input.defaultProps = {
  className: '',
  'data-testid': '',
  icon: '',
  onClick: undefined,
  optional: false,
  placeholder: '',
  wide: false,
};

export default Input;
