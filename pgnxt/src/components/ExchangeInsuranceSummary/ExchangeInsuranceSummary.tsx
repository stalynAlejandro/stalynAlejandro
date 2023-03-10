import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExchangeInsuranceDto } from '../../api/types/ExchangeInsuranceDto';
import { formatDate } from '../../utils/dates';
import { formatNumber } from '../../utils/formatNumber';
import { Currency } from '../Currency';
import { Icon } from '../Icon';
import { TextButton } from '../TextButton';
import {
  StSummaryContainer,
  StToggleContainer,
  StToggledContent,
} from './ExchangeInsuranceSummaryStyled';

interface ExchangeInsuranceSummaryProps {
  className?: string;
  exchangeInsurance: ExchangeInsuranceDto;
  onDelete: (exchangeInsuranceId: string) => void;
  onEdit: (exchangeInsuranceId: string) => void;
}

const ExchangeInsuranceSummary: React.FC<ExchangeInsuranceSummaryProps> = ({
  className,
  exchangeInsurance,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const {
    buyCurrency,
    exchangeInsuranceId,
    exchangeRate,
    sellCurrency,
    type,
    useAmount,
    useDate,
  } = exchangeInsurance;

  const toggleContent = () => {
    setIsOpened((current) => !current);
  };

  return (
    <StSummaryContainer
      className={className}
      data-insuranceid={exchangeInsuranceId}
      data-testid="exchange-insurance-summary"
    >
      <StToggleContainer>
        <div className="exchange-rate">FX {exchangeRate}</div>
        <div className="currencies">
          <Currency currency={sellCurrency} showFlag />
          <Currency currency={buyCurrency} showFlag />
        </div>
        <div className="used-amount">
          {t('NAmountUsed', {
            amount: `${formatNumber(useAmount)} ${buyCurrency}`,
          })}
        </div>
        <Icon
          icon={(isOpened && 'chevron-up-bold') || 'chevron-down-bold'}
          size={28}
          onClick={toggleContent}
        />
      </StToggleContainer>
      {isOpened && (
        <StToggledContent>
          <div>
            <span>{t('insuranceId')}</span>
            <span className="bold">{exchangeInsuranceId}</span>
          </div>
          <div>
            <span>{t('type')}</span>
            <span className="bold">
              {t(`exchangeInsuranceTypes.${type.toLowerCase()}`)}
            </span>
          </div>
          <div>
            <span>{t('settlementDate')}</span>
            <span className="bold">{formatDate(new Date(useDate))}</span>
          </div>
          <div className="actions">
            <TextButton
              icon="edit"
              iconPosition="left"
              iconSize={20}
              label={t('edit')}
              onClick={() => onEdit(exchangeInsuranceId)}
            />
            <TextButton
              icon="forbidden"
              iconPosition="left"
              iconSize={20}
              label={t('delete')}
              onClick={() => onDelete(exchangeInsuranceId)}
            />
          </div>
        </StToggledContent>
      )}
    </StSummaryContainer>
  );
};

ExchangeInsuranceSummary.defaultProps = {
  className: '',
};

export default ExchangeInsuranceSummary;
