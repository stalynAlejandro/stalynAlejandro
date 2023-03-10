import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ActionModal } from '../../../../components/ActionModal';
import Navigation from '../../../../constants/navigation';
import { StActionsContainer, StActionCard } from '../NewRequestsTabsStyled';
import { ModalAdvanceExportCollection, ModalCliPayments } from './modals';
import ModalCliFinancing from './modals/ModalCliFinancing';

const CollectionsTab: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateIfDev = (url: string) => {
    if (process.env.NODE_ENV === 'development') {
      navigate(url);
    }
  };

  const tabModals = {
    advanceExportCollection: {
      component: <ModalAdvanceExportCollection />,
      title: 'collectionsTab.advanceExportCollection',
    },
    cliFinancing: {
      component: <ModalCliFinancing />,
      title: 'collectionsTab.cliFinancing',
    },
    cliPayments: {
      component: <ModalCliPayments />,
      title: 'collectionsTab.cliPayments',
    },
  };

  const [modalOpen, setModalOpen] = useState<keyof typeof tabModals>();

  const exportationItems = [
    {
      description: t('collectionsTab.admissionExportationDescription'),
      icon: 'add',
      onClick: () => navigate(Navigation.forms.cle.request.create),
      title: t('collectionsTab.admission'),
    },
    {
      description: t('collectionsTab.modificationDescription'),
      icon: 'edit',
      onClick: () => navigate(Navigation.forms.cle.modification.create),
      title: t('collectionsTab.modification'),
    },
    {
      description: t('collectionsTab.moneyAdvancesDescription'),
      icon: 'financing-clock',
      onClick: () => setModalOpen('advanceExportCollection'),
      title: t('collectionsTab.moneyAdvances'),
    },
    {
      description: t('collectionsTab.otherOperationsDescription'),
      icon: 'analysis',
      onClick: () => navigate(Navigation.forms.cle.otherOperations.create),
      title: t('collectionsTab.otherOperations'),
    },
  ];

  const importationItems = [
    {
      description: t('collectionsTab.admissionImportationDescription'),
      icon: 'add',
      onClick: () => navigate(Navigation.forms.cli.request.create),
      title: t('collectionsTab.admission'),
    },
    {
      description: t('collectionsTab.modificationDescription'),
      icon: 'edit',
      onClick: () => navigate(Navigation.forms.cli.modification.create),
      title: t('collectionsTab.modification'),
    },
    {
      description: t('collectionsTab.paymentDescription'),
      icon: 'payment',
      onClick: () => setModalOpen('cliPayments'),
      title: t('collectionsTab.payment'),
    },
    {
      description: t('collectionsTab.financingDescription'),
      icon: 'financing',
      onClick: () => setModalOpen('cliFinancing'),
      title: t('collectionsTab.financing'),
    },
    {
      description: t('collectionsTab.otherOperationsDescription'),
      icon: 'analysis',
      onClick: () => navigate(Navigation.forms.cli.otherOperations.create),
      title: t('collectionsTab.otherOperations'),
    },
  ];

  return (
    <>
      <StActionsContainer>
        <StActionCard
          items={exportationItems}
          title={t('collectionsExportation')}
        />
        <StActionCard
          items={importationItems}
          title={t('collectionsImportation')}
        />
      </StActionsContainer>
      <ActionModal
        isOpen={!!modalOpen}
        title={t(tabModals[modalOpen!]?.title)}
        onClose={() => setModalOpen(undefined)}
      >
        {tabModals[modalOpen!]?.component}
      </ActionModal>
    </>
  );
};

export default CollectionsTab;
