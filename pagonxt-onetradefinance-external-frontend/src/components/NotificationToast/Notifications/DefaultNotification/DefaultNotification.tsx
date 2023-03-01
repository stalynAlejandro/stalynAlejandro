import React from 'react';
import { useTranslation } from 'react-i18next';

import { StTitle, StDescription } from './DefaultNotificationStyled';

interface DefaultNotificationProps {
  description: string;
  title: string;
}

const DefaultNotification: React.FC<DefaultNotificationProps> = ({
  description,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <StTitle>{t(title)}</StTitle>
      <StDescription>{t(description)}</StDescription>
    </>
  );
};

export default DefaultNotification;
