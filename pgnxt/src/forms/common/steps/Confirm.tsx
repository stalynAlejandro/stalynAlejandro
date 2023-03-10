import React from 'react';
import { useTranslation } from 'react-i18next';

import { SummaryCard } from '../../../components/SummaryCard';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import { StSummaryFormStepContainer } from '../../FormStyled';
import { StepProps } from '../types/StepProps';

const Confirm: React.FC<StepProps> = ({ formData, onSummarizeFormData }) => {
  const { t } = useTranslation();

  const summarizedInfo = onSummarizeFormData!();

  const reformattedInfo: SummaryCardProps = {
    ...summarizedInfo,
    sections: [
      {
        fields: [
          {
            label: 'client',
            value: formData.customer?.name,
          },
          {
            label: 'taxId',
            value: formData.customer?.taxId,
          },
        ],
        key: 'customer',
        title: 'client',
      },
      ...summarizedInfo.sections.filter(
        (section) => section.key !== 'customer',
      ),
    ],
  };

  return (
    <StSummaryFormStepContainer centerTitle title={t('pleaseVerifyData')}>
      <SummaryCard {...reformattedInfo} title="" />
    </StSummaryFormStepContainer>
  );
};

export default Confirm;
