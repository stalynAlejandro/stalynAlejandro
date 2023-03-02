import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SquaredCard } from '../../../../../components/SquaredCard';
import Navigation from '../../../../../constants/navigation';

const ModalCliPayments: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateIfDev = (url: string) => {
    if (process.env.NODE_ENV === 'development') {
      navigate(url);
    }
  };

  return (
    <>
      <SquaredCard
        className="actionModal__action"
        icon="wallet-plus"
        title={t('collectionsTab.accountCharge')}
        onClick={() => navigate(Navigation.forms.cli.paymentCharge.create)}
      />
      <SquaredCard
        className="actionModal__action"
        icon="financing-gear"
        title={t('collectionsTab.paymentFinancing')}
        onClick={() => navigate(Navigation.forms.cli.paymentFinancing.create)}
      />
      <SquaredCard
        className="actionModal__action"
        icon="wallet-cross"
        title={t('collectionsTab.withoutAccount')}
        onClick={() => navigate(Navigation.forms.cli.paymentAccountless.create)}
      />
    </>
  );
};

export default ModalCliPayments;
