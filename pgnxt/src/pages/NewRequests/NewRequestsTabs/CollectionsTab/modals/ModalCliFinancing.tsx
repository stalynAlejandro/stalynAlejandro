import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SquaredCard } from '../../../../../components/SquaredCard';
import Navigation from '../../../../../constants/navigation';

const ModalCliFinancing: React.FC = () => {
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
        icon="file-add"
        title={t('collectionsTab.admission')}
        onClick={() => navigate(Navigation.forms.cli.financingRequest.create)}
      />
      <SquaredCard
        className="actionModal__action"
        icon="file-edit"
        title={t('collectionsTab.modification')}
        onClick={() =>
          navigate(Navigation.forms.cli.financingModification.create)
        }
      />
      <SquaredCard
        className="actionModal__action"
        icon="file-cancel"
        title={t('collectionsTab.cancellation')}
        onClick={() =>
          navigate(Navigation.forms.cli.financingCancellation.create)
        }
      />
    </>
  );
};

export default ModalCliFinancing;
