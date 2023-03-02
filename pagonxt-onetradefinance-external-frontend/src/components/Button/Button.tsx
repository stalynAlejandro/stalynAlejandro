import React from 'react';

import { StButton } from './ButtonStyled';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  inverse?: boolean;
  label: string;
  onClick: () => void;
  type?: 'submit' | 'reset' | 'button';
  wide?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  inverse,
  label,
  onClick,
  type,
  wide,
}) => (
  <StButton
    className={className}
    data-testid="button"
    disabled={!!disabled}
    inverse={!!inverse}
    type={type}
    wide={!!wide}
    onClick={onClick}
  >
    {label}
  </StButton>
);

Button.defaultProps = {
  className: '',
  disabled: false,
  inverse: false,
  type: 'button',
  wide: false,
};

export default Button;
