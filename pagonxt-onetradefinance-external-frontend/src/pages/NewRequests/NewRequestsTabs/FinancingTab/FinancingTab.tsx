import React from 'react';
import { useTranslation } from 'react-i18next';

import { StActionsContainer, StActionCard } from '../NewRequestsTabsStyled';

const FinancingTab: React.FC = () => {
  const { t } = useTranslation();

  const actionItems = [
    {
      description: t('financingTab.issuanceDescription'),
      icon: 'add',
      onClick: () => null,
      title: t('financingTab.issuance'),
    },
    {
      description: t('financingTab.modificationDescription'),
      icon: 'edit',
      onClick: () => null,
      title: t('financingTab.modification'),
    },
    {
      description: t('financingTab.cancellationRequestDescription'),
      icon: 'nomessages',
      onClick: () => null,
      title: t('financingTab.cancellationRequest'),
    },
    {
      description: t('financingTab.otherInformationAndQueriesDescription'),
      icon: 'analysis',
      onClick: () => null,
      title: t('financingTab.otherInformationAndQueries'),
    },
  ];

  return (
    <StActionsContainer>
      <StActionCard
        items={actionItems}
        title={t('documentaryCreditImportation')}
      />
    </StActionsContainer>
  );
};

export default FinancingTab;
