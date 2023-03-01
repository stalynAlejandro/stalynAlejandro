import React from 'react';

import { StButton, StLeftIcon, StRightIcon } from './TextButtonStyled';

export interface TextButtonProps {
  className?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  label: string;
  onClick: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  className,
  icon,
  iconPosition,
  iconSize,
  label,
  onClick,
}) => (
  <StButton
    className={className}
    data-testid="text-button"
    type="button"
    onClick={onClick}
  >
    {icon && iconPosition === 'left' && (
      <StLeftIcon icon={icon} size={iconSize} />
    )}
    <span>{label}</span>
    {icon && iconPosition === 'right' && (
      <StRightIcon icon={icon} size={iconSize} />
    )}
  </StButton>
);

TextButton.defaultProps = {
  className: '',
  icon: '',
  iconPosition: 'left',
  iconSize: undefined,
};

export default TextButton;
