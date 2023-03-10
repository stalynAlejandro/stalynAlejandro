import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { RiskLineDto } from '../../api/types/RiskLineDto';
import { formatDate } from '../../utils/dates';
import { getNumberFormatProps } from '../../utils/getNumberFormatProps';
import { Currency } from '../Currency';
import { Table } from '../Table';

const RiskLineTable: React.FC<{ riskLine: RiskLineDto }> = ({
  riskLine: { availableAmount, currency, expires, iban, id, status },
}) => {
  const { t } = useTranslation();

  return (
    <Table
      cols={[
        { key: 'riskLine', label: t('riskLine') },
        { key: 'expires', label: t('expiration') },
        { key: 'availableAmount', label: t('available') },
        { key: 'currency', label: t('currency') },
      ]}
      data-testid="risk-line-table"
      hideMetadata
      rows={{
        [`${id}`]: {
          availableAmount: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              value={availableAmount}
            />
          ),
          currency: <Currency currency={currency || ''} showFlag />,
          expires: formatDate(new Date(expires)),
          riskLine: (
            <div>
              <div className="bold nowrap">{iban}</div>
              <span>{t(status ? `statuses.${status}` : '')}</span>
            </div>
          ),
        },
      }}
      selectable={false}
    />
  );
};

export default RiskLineTable;
