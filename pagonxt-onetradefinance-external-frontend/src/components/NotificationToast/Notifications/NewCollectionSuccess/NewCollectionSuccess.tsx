import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  StTitle,
  StSubtitle,
  StValuesContainer,
} from './NewCollectionSuccessStyled';

interface NewCollectionSuccessProps {
  clientName: string;
  priority: string;
  reference?: string;
  subtitle: string;
  title: string;
}

const NewCollectionSuccess: React.FC<NewCollectionSuccessProps> = ({
  clientName,
  priority = '',
  reference,
  subtitle,
  title,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <StTitle>{title}</StTitle>
      <StSubtitle>{subtitle}</StSubtitle>
      <StValuesContainer>
        <li>
          <span>{t('reference')}:</span>
          <span>{reference}</span>
        </li>
        <li>
          <span>{t('clientName')}:</span>
          <span>{clientName}</span>
        </li>
        <li>
          <span>{t('priority')}:</span>
          <span>{priority}</span>
        </li>
      </StValuesContainer>
    </>
  );
};

NewCollectionSuccess.defaultProps = {
  reference: '',
};

export default NewCollectionSuccess;
