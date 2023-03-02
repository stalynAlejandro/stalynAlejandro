import React from 'react';

import { StPlaceholder } from './FloatingPlaceholderStyled';

interface FloatingPlaceholderProps {
  children?: React.ReactNode;
  className?: string;
  isFloating?: boolean;
  wide?: boolean;
}

const FloatingPlaceholder: React.FC<FloatingPlaceholderProps> = ({
  children,
  className,
  isFloating,
  wide,
}) => (
  <StPlaceholder
    className={className}
    data-testid="floating-placeholder"
    isFloating={!!isFloating}
    wide={!!wide}
  >
    {children}
  </StPlaceholder>
);

FloatingPlaceholder.defaultProps = {
  children: null,
  className: '',
  isFloating: false,
  wide: false,
};

export default FloatingPlaceholder;
