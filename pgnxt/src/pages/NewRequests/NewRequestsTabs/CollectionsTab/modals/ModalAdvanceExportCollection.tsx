import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SquaredCard } from '../../../../../components/SquaredCard';
import Navigation from '../../../../../constants/navigation';

const ModalAdvanceExportCollection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <SquaredCard
        className="actionModal__action"
        icon="file-add"
        title={t('collectionsTab.admission')}
        onClick={() => navigate(Navigation.forms.cle.advance.create)}
      />
      <SquaredCard
        className="actionModal__action"
        icon="file-edit"
        title={t('collectionsTab.modification')}
        onClick={() =>
          navigate(Navigation.forms.cle.advanceModification.create)
        }
      />
      <SquaredCard
        className="actionModal__action"
        icon="file-cancel"
        title={t('collectionsTab.cancellation')}
        onClick={() =>
          navigate(Navigation.forms.cle.advanceCancellation.create)
        }
      />
    </>
  );
};

export default ModalAdvanceExportCollection;
