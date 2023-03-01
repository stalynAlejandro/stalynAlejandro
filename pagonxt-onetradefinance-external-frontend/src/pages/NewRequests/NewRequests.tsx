import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentContainer } from '../../components/ContentContainer';
import { PageTitle } from '../../components/PageTitle';
import { PageWithMenu } from '../../components/PageWithMenu';
import { Tabs } from '../../components/Tabs';
import { StContent } from './NewRequestsStyled';
import {
  CollectionsTab,
  GuaranteesTab,
  FinancingTab,
  DocumentaryCreditTab,
} from './NewRequestsTabs';

const NewRequests: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('');

  const tabItems = [
    {
      component: <DocumentaryCreditTab />,
      key: 'documentaryCredit',
      label: t('documentaryCredit'),
    },
    {
      component: <CollectionsTab />,
      key: 'collections',
      label: t('collections'),
    },
    {
      component: <GuaranteesTab />,
      key: 'guarantees',
      label: t('guarantees'),
    },
    {
      component: <FinancingTab />,
      key: 'financing',
      label: t('financings'),
    },
  ];

  return (
    <PageWithMenu>
      <PageTitle title={t('newRequests')}>
        <Tabs items={tabItems} onTabClick={setActiveTab} />
      </PageTitle>
      <ContentContainer>
        <StContent>
          {activeTab &&
            tabItems.find((item) => item.key === activeTab)?.component}
        </StContent>
      </ContentContainer>
    </PageWithMenu>
  );
};

export default NewRequests;
