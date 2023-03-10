import React from 'react';

import { StIcon } from './IconStyled';

interface IconProps {
  className?: string;
  'data-testid'?: string;
  icon: string;
  onClick?: () => void;
  size?: number;
}

const Icon: React.FC<IconProps> = ({
  className,
  'data-testid': dataTestId,
  icon,
  onClick,
  size,
}) => (
  <StIcon
    alt=""
    className={className}
    data-testid={dataTestId || `icon-${icon}`}
    size={size}
    src={`/images/icon-${icon}.svg`}
    onClick={onClick}
  />
);

Icon.defaultProps = {
  className: '',
  'data-testid': '',
  onClick: undefined,
  size: 24,
};

export default Icon;
