import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { ExchangeInsuranceDto } from '../../api/types/ExchangeInsuranceDto';
import { Button } from '../../components/Button';
import { ContentContainer } from '../../components/ContentContainer';
import { DatePicker } from '../../components/Controls/DatePicker';
import { Input } from '../../components/Controls/Input';
import { Currency } from '../../components/Currency';
import { TableProps } from '../../components/Table/Table';
import { useFetchExchangeInsurances } from '../../hooks/fetchDataHooks';
import { formatDate } from '../../utils/dates';
import { getNumberFormatProps } from '../../utils/getNumberFormatProps';
import {
  StInsuranceSelectorContainer,
  StInputsContainer,
  StTitle,
  StCurrencyPairContainer,
  StContinueButtonContainer,
  StAvailableAmountContainer,
  StAmountInput,
  StTable,
} from './ExchangeInsuranceSelectorStyled';

interface ExchangeInsuranceSelectorProps {
  amount: string;
  currencyBuy: string;
  currencySell: string;
  customerId: string;
  expirationDate: string;
  isBuyOperation?: boolean;
  isMulti?: boolean;
  onApply: (selectedInsurances: ExchangeInsuranceDto[]) => void;
  onClose: () => void;
  selectedInsurances?: ExchangeInsuranceDto[];
}

interface SelectedExchangeInsurancesProps {
  [key: string]: ExchangeInsuranceDto;
}

const InsuranceAvailableAmount: React.FC<
  Pick<
    ExchangeInsuranceDto,
    'buyAmount' | 'buyCurrency' | 'sellAmount' | 'sellCurrency'
  >
> = ({ buyAmount, buyCurrency, sellAmount, sellCurrency }) => {
  const { t } = useTranslation();

  return (
    <StAvailableAmountContainer>
      <div className="exchangeInsuranceSelector__amountContainer">
        <span className="bold exchangeInsuranceSelector__amountValue">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${sellCurrency}`}
            value={sellAmount}
          />
        </span>
        <span className="exchangeInsuranceSelector__amountHint">
          {t('sell')}
        </span>
      </div>
      <div className="exchangeInsuranceSelector__amountContainer">
        <span className="bold exchangeInsuranceSelector__amountValue">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${buyCurrency}`}
            value={buyAmount}
          />
        </span>
        <span className="exchangeInsuranceSelector__amountHint">
          {t('buy')}
        </span>
      </div>
    </StAvailableAmountContainer>
  );
};

const ExchangeInsuranceSelector: React.FC<ExchangeInsuranceSelectorProps> = ({
  amount,
  currencyBuy = '',
  currencySell = '',
  customerId,
  expirationDate,
  isBuyOperation,
  isMulti,
  onApply,
  onClose,
  selectedInsurances,
}) => {
  const { t } = useTranslation();

  const { exchangeInsurances } = useFetchExchangeInsurances({
    amount,
    buy: !!isBuyOperation,
    currencyBuy,
    currencySell,
    customerId,
  });

  const [selectedExchangeInsurances, setSelectedExchangeInsurances] =
    useState<SelectedExchangeInsurancesProps>({});
  const [exchangeInsurancesRows, setExchangeInsurancesRows] = useState<
    TableProps['rows']
  >({});

  const onSelect = (key: string, isSelected: boolean) => {
    setSelectedExchangeInsurances((current) => {
      const currentCopy = current;

      if (isSelected) {
        // Get the selected insurance
        const selected = exchangeInsurances?.find(
          (ins) => ins.exchangeInsuranceId === key,
        );

        if (selected) {
          if (isMulti) {
            return {
              ...currentCopy,
              [selected.exchangeInsuranceId]: selected,
            } as SelectedExchangeInsurancesProps;
          }

          return {
            [selected.exchangeInsuranceId]: selected,
          } as SelectedExchangeInsurancesProps;
        }

        // eslint-disable-next-line no-console
        console.warn(
          'Selected insurance is not found between retrieved insurances from API.',
        );
        return current;
      }

      // Unselect it
      delete currentCopy[key];
      return currentCopy;
    });
  };

  const updateInsuranceField = (insuranceKey: string, newFields: any) => {
    setSelectedExchangeInsurances((current) => ({
      ...current,
      [insuranceKey]: {
        ...current[insuranceKey],
        ...newFields,
      },
    }));
  };

  // Map insurances to row structure to be sent to Table component
  useEffect(() => {
    const mappedInsurances: TableProps['rows'] = {};

    if (exchangeInsurances?.length) {
      exchangeInsurances.forEach(
        ({
          buyAmount,
          buyCurrency,
          exchangeInsuranceId,
          exchangeRate,
          sellAmount,
          sellCurrency,
          type,
          useDate,
        }) => {
          const selectedInsurance =
            selectedExchangeInsurances[exchangeInsuranceId];

          mappedInsurances[exchangeInsuranceId] = {
            availableAmount: (
              <InsuranceAvailableAmount
                buyAmount={buyAmount}
                buyCurrency={buyCurrency}
                sellAmount={sellAmount}
                sellCurrency={sellCurrency}
              />
            ),
            exchangeInsuranceId,
            exchangeRate,
            type: t(`exchangeInsuranceTypes.${type.toLowerCase()}`),
            useAmount: (selectedInsurance && (
              <StAmountInput
                className="exchangeInsuranceSelector__amountInput"
                {...getNumberFormatProps()}
                isAllowed={(values) =>
                  getNumberFormatProps().isAllowed(
                    values,
                    Number.parseFloat(amount),
                  )
                }
                placeholder={t('amountToUse')}
                suffix={` ${buyCurrency}`}
                type="number"
                value={selectedInsurance?.useAmount || '0.00'}
                onChange={(val) =>
                  updateInsuranceField(exchangeInsuranceId, { useAmount: val })
                }
              />
            )) || (
              <NumberFormat
                {...getNumberFormatProps()}
                displayType="text"
                suffix={` ${buyCurrency}`}
                value="0.00"
              />
            ),
            useDate: formatDate(new Date(useDate)),
          };
        },
      );
    }

    setExchangeInsurancesRows(mappedInsurances);
  }, [exchangeInsurances, selectedExchangeInsurances]);

  // Update selected insurances to display modified and saved values
  useEffect(() => {
    const newSelected: SelectedExchangeInsurancesProps = {};

    selectedInsurances?.forEach((ins) => {
      newSelected[ins.exchangeInsuranceId] = ins;
    });

    setSelectedExchangeInsurances(newSelected);
  }, [selectedInsurances]);

  return (
    <StInsuranceSelectorContainer data-testid="exchange-insurance-selector">
      <StInputsContainer>
        <div>
          <DatePicker
            disabled
            placeholder={t('settlementDate')}
            value={expirationDate}
            onChange={() => null}
          />
          <Input
            {...getNumberFormatProps()}
            disabled
            placeholder={t('amountToInsure')}
            suffix={` ${currencyBuy}`}
            type="number"
            value={amount}
            onChange={() => null}
          />
        </div>
      </StInputsContainer>
      <ContentContainer>
        <div>
          <StTitle>{t('exchangeInsurance')}</StTitle>
          <StCurrencyPairContainer data-testid="exchange-insurance-currencies-container">
            <span>{t('currencyPair')}:</span>
            <Currency currency={currencySell} showFlag />
            <Currency currency={currencyBuy} showFlag />
          </StCurrencyPairContainer>
          <StTable
            cols={[
              {
                key: 'exchangeInsuranceId',
                label: t('exchangeInsuranceId'),
              },
              { key: 'type', label: t('type') },
              { key: 'useDate', label: t('settlementDate') },
              { key: 'availableAmount', label: t('availableAmount') },
              { key: 'exchangeRate', label: 'FX' },
              { key: 'useAmount', label: t('amountToUse') },
            ]}
            isMulti={isMulti}
            rows={exchangeInsurancesRows}
            selectable
            selectedRows={selectedInsurances?.map(
              ({ exchangeInsuranceId }) => exchangeInsuranceId,
            )}
            onSelect={onSelect}
          />
          <StContinueButtonContainer>
            <Button
              label={t('continue')}
              wide
              onClick={() => {
                onApply(Object.values(selectedExchangeInsurances));
                onClose();
              }}
            />
          </StContinueButtonContainer>
        </div>
      </ContentContainer>
    </StInsuranceSelectorContainer>
  );
};

ExchangeInsuranceSelector.defaultProps = {
  isBuyOperation: false,
  isMulti: false,
  selectedInsurances: [],
};

export default ExchangeInsuranceSelector;
