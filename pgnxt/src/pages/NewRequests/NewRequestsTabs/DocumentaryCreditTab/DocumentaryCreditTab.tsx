import React from 'react';
import { useTranslation } from 'react-i18next';

import { StActionsContainer, StActionCard } from '../NewRequestsTabsStyled';

const DocumentaryCreditTab: React.FC = () => {
  const { t } = useTranslation();

  const exportationItems = [
    {
      description: t('creditTab.notificationDescription'),
      icon: 'add',
      onClick: () => null,
      title: t('creditTab.notification'),
    },
    {
      description: t('creditTab.modificationDescription'),
      icon: 'edit',
      onClick: () => null,
      title: t('creditTab.modification'),
    },
    {
      description: t('creditTab.prerevisionDescription'),
      icon: 'help',
      onClick: () => null,
      title: t('creditTab.prerevision'),
    },
    {
      description: t('creditTab.usageDescription'),
      icon: 'help',
      onClick: () => null,
      title: t('creditTab.usage'),
    },
    {
      description: t('creditTab.otherInformationAndQueriesDescription'),
      icon: 'analysis',
      onClick: () => null,
      title: t('creditTab.otherInformationAndQueries'),
    },
  ];

  const importationItems = [
    {
      description: t('creditTab.issuanceDescription'),
      icon: 'add',
      onClick: () => null,
      title: t('creditTab.issuance'),
    },
    {
      description: t('creditTab.modificationDescription'),
      icon: 'edit',
      onClick: () => null,
      title: t('creditTab.modification'),
    },
    {
      description: t('creditTab.documentationRevisionDescription'),
      icon: 'help',
      onClick: () => null,
      title: t('creditTab.documentationRevision'),
    },
    {
      description: t('creditTab.paymentInstructionsDescription'),
      icon: 'clipboard-check',
      onClick: () => null,
      title: t('creditTab.paymentInstructions'),
    },
    {
      description: t('creditTab.otherInformationAndQueriesDescription'),
      icon: 'analysis',
      onClick: () => null,
      title: t('creditTab.otherInformationAndQueries'),
    },
  ];

  return (
    <StActionsContainer>
      <StActionCard
        items={exportationItems}
        title={t('documentaryCreditExportation')}
      />
      <StActionCard
        items={importationItems}
        title={t('documentaryCreditImportation')}
      />
    </StActionsContainer>
  );
};

export default DocumentaryCreditTab;
