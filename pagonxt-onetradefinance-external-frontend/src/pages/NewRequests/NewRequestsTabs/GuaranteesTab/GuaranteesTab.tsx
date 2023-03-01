import React from 'react';
import { useTranslation } from 'react-i18next';

import { StActionsContainer, StActionCard } from '../NewRequestsTabsStyled';

const GuaranteesTab: React.FC = () => {
  const { t } = useTranslation();

  const issuedItems = [
    {
      description: t('guaranteesTab.draftPreissuanceDescription'),
      icon: 'add',
      onClick: () => null,
      title: t('guaranteesTab.draftPreissuance'),
    },
    {
      description: t('guaranteesTab.issuanceDescription'),
      icon: 'add',
      onClick: () => null,
      title: t('guaranteesTab.issuance'),
    },
    {
      description: t('guaranteesTab.modificationDescription'),
      icon: 'edit',
      onClick: () => null,
      title: t('guaranteesTab.modification'),
    },
    {
      description: t('guaranteesTab.executionDescription'),
      icon: 'invest',
      onClick: () => null,
      title: t('guaranteesTab.execution'),
    },
    {
      description: t('guaranteesTab.otherInformationAndQueriesDescription'),
      icon: 'analysis',
      onClick: () => null,
      title: t('guaranteesTab.otherInformationAndQueries'),
    },
  ];

  const receivedItems = [
    {
      description: t('guaranteesTab.executionReceivedDescription'),
      icon: 'invest',
      onClick: () => null,
      title: t('guaranteesTab.execution'),
    },
    {
      description: t('guaranteesTab.otherInformationAndQueriesDescription'),
      icon: 'analysis',
      onClick: () => null,
      title: t('guaranteesTab.otherInformationAndQueries'),
    },
  ];

  return (
    <StActionsContainer>
      <StActionCard items={issuedItems} title={t('issuedGuarantees')} />
      <StActionCard items={receivedItems} title={t('receivedGuarantees')} />
    </StActionsContainer>
  );
};

export default GuaranteesTab;
