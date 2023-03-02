import React from 'react';
import { useTranslation } from 'react-i18next';

import { StColoredStatus } from './ColoredStatusStyled';

interface ColoredStatusProps {
  status: string;
}

const ColoredStatus: React.FC<ColoredStatusProps> = ({ status }) => {
  const { t } = useTranslation();
  const processedStatus = status.toLowerCase();

  return (
    <StColoredStatus status={processedStatus}>
      {t(`statuses.${processedStatus}`)}
    </StColoredStatus>
  );
};

export default ColoredStatus;
