import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button';
import { StIcon, StSquaredCardContainer, StTitle } from './SquaredCardStyled';

export interface SquaredCardProps {
  className?: string;
  icon: string;
  label?: string;
  onClick: () => void;
  title: string;
}

const SquaredCard: React.FC<SquaredCardProps> = ({
  className,
  icon,
  label,
  onClick,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <StSquaredCardContainer className={className} data-testid="squared-card">
      <StIcon icon={icon} size={50} />
      <StTitle>{title}</StTitle>
      <Button label={t(label!)} onClick={onClick} />
    </StSquaredCardContainer>
  );
};

SquaredCard.defaultProps = {
  className: '',
  label: 'continue',
};

export default SquaredCard;
