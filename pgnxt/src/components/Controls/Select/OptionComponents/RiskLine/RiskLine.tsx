import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { OptionContext } from 'react-select';

import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import { formatDate } from '../../../../../utils/dates';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import { Currency } from '../../../../Currency';
import { DefaultValue } from '../DefaultValue';
import { StRiskLineContainer } from './RiskLineStyled';

export interface RiskLineProps {
  context: OptionContext;
  value: RiskLineDto;
}

const RiskLine: React.FC<RiskLineProps> = ({ context, value }) => {
  const { t } = useTranslation();
  const { availableAmount, currency, expires, iban, status } = value;

  if (context === 'menu') {
    return (
      <StRiskLineContainer className="option__label">
        <div>
          <div className="option__bold">{iban}</div>
          <span>{t(`statuses.${status}`)}</span>
        </div>
        <div>
          <div className="option__bold">
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              value={availableAmount}
            />
          </div>
          <span>{t('availableAmount')}</span>
        </div>
        <div>
          <div className="option__bold">
            {expires && formatDate(new Date(expires))}
          </div>
          <span>{t('expiration')}</span>
        </div>
        <div>
          <Currency currency={currency} />
        </div>
      </StRiskLineContainer>
    );
  }

  return <DefaultValue context={context} label={iban} value={value} />;
};

export default RiskLine;
