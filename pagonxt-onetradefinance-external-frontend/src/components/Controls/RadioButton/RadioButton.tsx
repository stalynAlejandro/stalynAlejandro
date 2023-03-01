import React, { forwardRef } from 'react';

import {
  StRadioButtonLabel,
  StCustomRadioButton,
  StLabel,
} from './RadioButtonStyled';

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  label?: string;
  onClick?: (value: any) => void;
  value?: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ disabled, label, onClick, value, ...rest }, ref) => (
    <StRadioButtonLabel
      data-testid="radio-button"
      disabled={!!disabled}
      onClick={() => onClick?.(value)}
    >
      <input
        ref={ref}
        disabled={disabled}
        readOnly
        type="radio"
        value={value}
        {...rest}
      />
      <StCustomRadioButton data-testid="radio-button-ui" />
      {label && <StLabel className="radioButton__label">{label}</StLabel>}
    </StRadioButtonLabel>
  ),
);

RadioButton.defaultProps = {
  disabled: false,
  label: '',
  onClick: undefined,
  value: '',
};

export default RadioButton;
