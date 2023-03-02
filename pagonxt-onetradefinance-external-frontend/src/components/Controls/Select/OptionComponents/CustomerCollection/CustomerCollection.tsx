import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { OptionContext } from 'react-select';

import { CustomerCleRequestDto } from '../../../../../api/types/CustomerCleRequestDto';
import { formatDate } from '../../../../../utils/dates';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import { Currency } from '../../../../Currency';
import { DefaultValue } from '../DefaultValue';
import { StCustomerCollectionContainer } from './CustomerCollectionStyled';

export interface CustomerCollectionProps {
  context: OptionContext;
  value: CustomerCleRequestDto;
}

const CustomerCollection: React.FC<CustomerCollectionProps> = ({
  context,
  value,
}) => {
  const { t } = useTranslation();
  const { amount, approvalDate, code, contractReference, currency } = value;

  if (context === 'menu') {
    return (
      <StCustomerCollectionContainer className="option__label">
        <div>
          <div className="option__bold">{code}</div>
          <span>{t('requestRef')}</span>
        </div>
        <div>
          <div className="option__bold">{contractReference}</div>
          <span>{t('contractRef')}</span>
        </div>
        <div>
          <div className="option__bold">
            {approvalDate && formatDate(new Date(approvalDate))}
          </div>
          <span>{t('issuanceDate')}</span>
        </div>
        <div>
          <div className="option__bold">
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              value={amount}
            />
          </div>
          <span>{t('amount')}</span>
        </div>
        <div>
          <Currency currency={currency} />
        </div>
      </StCustomerCollectionContainer>
    );
  }

  return (
    <DefaultValue
      context={context}
      label={code!}
      showCurrency={false}
      value={value}
    />
  );
};

export default CustomerCollection;
