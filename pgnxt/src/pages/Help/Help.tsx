import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageTitle } from '../../components/PageTitle';
import { PageWithMenu } from '../../components/PageWithMenu';

const Help: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageWithMenu>
      <PageTitle title={t('help')} />
    </PageWithMenu>
  );
};

export default Help;
