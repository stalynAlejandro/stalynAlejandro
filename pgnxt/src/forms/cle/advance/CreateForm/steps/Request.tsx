import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string, InferType, array } from 'yup';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';

import { FormStepContainer } from '../../../../../components/FormStepContainer';
import { StepProps } from '../../../../common/types/StepProps';
import { StButtonContainerRight, StTextarea } from '../../../../FormStyled';
import { RiskLine as RiskLineComponent } from '../../../../../components/Controls/Select/OptionComponents/RiskLine';
import { Button } from '../../../../../components/Button';
import { Select } from '../../../../../components/Controls/Select';
import { useFieldsState } from '../../../../../hooks/useFieldsState';
import { defaultIfEmpty } from '../../../../../utils/defaultIfEmpty';
import { SummaryCard } from '../../../../../components/SummaryCard';
import { Table } from '../../../../../components/Table';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import { Currency } from '../../../../../components/Currency';
import { formatDate } from '../../../../../utils/dates';
import { CustomerCollection as CustomerCollectionComponent } from '../../../../../components/Controls/Select/OptionComponents/CustomerCollection';
import { textIncludes } from '../../../../../helpers/textIncludes';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import { DatePicker } from '../../../../../components/Controls/DatePicker';
import { Input } from '../../../../../components/Controls/Input';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import {
  useFetchCurrencies,
  useFetchCustomerCleCollections,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { ExchangeInsuranceSelector } from '../../../../../containers/ExchangeInsuranceSelector';
import { ExchangeInsuranceSummary } from '../../../../../components/ExchangeInsuranceSummary';
import { ExchangeInsuranceDto } from '../../../../../api/types/ExchangeInsuranceDto';
import { CustomerCleRequestDto } from '../../../../../api/types/CustomerCleRequestDto';
import { getUser } from '../../../../../redux/selectors/user';
import { StepSubtitle } from '../../../../../components/StepSubtitle';
import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';

const fieldsSchema = object({
  advanceAmount: string().ensure().required(),
  advanceCurrency: object().nullable(),
  comments: string().ensure(),
  exchangeInsurances: array().of(object()).nullable(),
  exportCollection: object().nullable().required(),
  office: string()
    .ensure()
    .required()
    .test({
      name: 'office-format',
      test: (d) => /^\d{4}$/.test(d),
    }),
  requestExpiration: string().ensure().required(),
  riskLine: object().nullable().required(),
});

const Request: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useTranslation();
  const { office } = useSelector(getUser);
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLE,
    eventTypes.ADVANCE,
  );
  const initialData = {
    advanceCurrency: defaultCurrency,
    comments: '',
    office,
  };
  const [exchangeInsuranceSelectorShown, setExchangeInsuranceSelectorShown] =
    useState<boolean>(false);
  const { feedbackErrors, fieldsState, setFieldValue, validateFields } =
    useFieldsState<InferType<typeof fieldsSchema>>(
      fieldsSchema,
      defaultIfEmpty(formData.request, initialData),
    );

  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.advanceAmount,
    currency: fieldsState.advanceCurrency?.currency,
    expirationDate: fieldsState.requestExpiration,
    personNumber: formData.customer.personNumber,
    product: productTypes.CLE,
  });
  const { customerCollections } = useFetchCustomerCleCollections(
    formData.customer.personNumber,
  );
  const exportCollection =
    fieldsState.exportCollection as unknown as CustomerCleRequestDto;

  // Show the button if the currency of the nominal account is different from the advance currency
  const isExchangeInsuranceButtonShown =
    fieldsState.advanceAmount &&
    fieldsState.advanceCurrency &&
    exportCollection &&
    exportCollection.nominalAccount?.currency !==
      fieldsState.advanceCurrency.currency &&
    (!fieldsState.exchangeInsurances ||
      fieldsState.exchangeInsurances.length === 0);

  const handleSubmit = () => {
    if (validateFields()) {
      onDataChange(fieldsState);
      onSubmitStep();
    }
  };

  useEffect(() => {
    onDataChange(fieldsState);
  }, [fieldsState]);

  return (
    (exchangeInsuranceSelectorShown && (
      <ExchangeInsuranceSelector
        amount={fieldsState.advanceAmount!}
        currencyBuy={fieldsState.advanceCurrency!.currency!}
        currencySell={exportCollection.nominalAccount?.currency}
        customerId={formData.customer.personNumber}
        expirationDate={new Date().toJSON()}
        isBuyOperation
        selectedInsurances={
          (fieldsState.exchangeInsurances as unknown as ExchangeInsuranceDto[]) ||
          []
        }
        onApply={(val) => setFieldValue('exchangeInsurances', val)}
        onClose={() => setExchangeInsuranceSelectorShown(false)}
      />
    )) || (
      <FormStepContainer
        stepNumber={stepNumber || 2}
        title={t('completeClientAndOperationData')}
        withLateralContent
      >
        <form>
          <Select
            className="form-field--wide"
            error={feedbackErrors.exportCollection}
            filterOption={(
              {
                value: { amount, code, currency, customer } = {},
              }: { value: any },
              input: string,
            ) =>
              textIncludes(amount, input) ||
              textIncludes(currency, input) ||
              textIncludes(code, input) ||
              textIncludes(customer?.name, input)
            }
            isSearchable
            name="exportCollection"
            options={customerCollections?.map((data) => ({
              component: CustomerCollectionComponent,
              value: data,
            }))}
            placeholder={t('requestReference')}
            value={fieldsState.exportCollection}
            valueKey="code"
            onChange={(val) => {
              setFieldValue('exportCollection', val);
            }}
          />
          {fieldsState.exportCollection &&
            Object.keys(fieldsState.exportCollection).length > 0 && (
              <Table
                cols={[
                  { key: 'reference', label: t('requestRef') },
                  { key: 'contractReference', label: t('contractRef') },
                  { key: 'approvalDate', label: t('issuanceDate') },
                  { key: 'amount', label: t('amount') },
                  { key: 'currency', label: t('currency') },
                ]}
                hideMetadata
                rows={{
                  [`${fieldsState.exportCollection.id}`]: {
                    amount: (
                      <NumberFormat
                        {...getNumberFormatProps()}
                        displayType="text"
                        value={fieldsState.exportCollection.amount}
                      />
                    ),
                    approvalDate: formatDate(
                      new Date(fieldsState.exportCollection.approvalDate),
                    ),
                    contractReference:
                      fieldsState.exportCollection.contractReference,
                    currency: (
                      <Currency
                        currency={fieldsState.exportCollection.currency || ''}
                        showFlag
                      />
                    ),
                    reference: fieldsState.exportCollection.code,
                  },
                }}
                selectable={false}
              />
            )}
          <InputSelect
            error={
              feedbackErrors.advanceAmount || feedbackErrors.advanceCurrency
            }
            options={mappedCurrencies}
            placeholder={t('advanceAmount')}
            type="number"
            value={{
              input: fieldsState.advanceAmount,
              select: fieldsState.advanceCurrency || defaultCurrency,
            }}
            wide
            onChange={({ input, select }) => {
              setFieldValue('advanceAmount', input);
              setFieldValue('advanceCurrency', select);
            }}
          />
          {isExchangeInsuranceButtonShown && (
            <>
              <Button
                inverse
                label={t('exchangeInsurance')}
                onClick={() => setExchangeInsuranceSelectorShown(true)}
              />
              <StButtonContainerRight />
            </>
          )}
          {fieldsState.exchangeInsurances &&
            fieldsState.exchangeInsurances.length > 0 && (
              <div className="form__exchangeInsurancesSummaryContainer">
                <StepSubtitle subtitle={t('exchangeInsurance')} />
                {fieldsState.exchangeInsurances.map((ins) => (
                  <ExchangeInsuranceSummary
                    key={`exchange-insurance-${ins.exchangeInsuranceId}`}
                    exchangeInsurance={ins as unknown as ExchangeInsuranceDto}
                    onDelete={() =>
                      setFieldValue(
                        'exchangeInsurances',
                        fieldsState.exchangeInsurances?.filter(
                          (item) =>
                            item.exchangeInsuranceId !==
                            ins.exchangeInsuranceId,
                        ),
                      )
                    }
                    onEdit={() => setExchangeInsuranceSelectorShown(true)}
                  />
                ))}
              </div>
            )}
          <DatePicker
            placeholder={t('expiration')}
            value={fieldsState.requestExpiration}
            onChange={(val) =>
              setFieldValue('requestExpiration', val?.toISOString())
            }
          />
          <Select
            className="form-field--wide"
            error={feedbackErrors.riskLine}
            filterOption={(
              {
                value: { currency, expires, iban, status } = {},
              }: { value: any },
              input: string,
            ) =>
              textIncludes(iban, input) ||
              textIncludes(currency, input) ||
              textIncludes(expires, input) ||
              textIncludes(status, input)
            }
            isSearchable
            name="riskLine"
            options={riskLines?.map((data) => ({
              component: RiskLineComponent,
              value: data,
            }))}
            placeholder={t('riskLine')}
            value={fieldsState.riskLine}
            valueKey="riskLineId"
            onChange={(val) => {
              setFieldValue('riskLine', val);
            }}
          />
          {fieldsState.riskLine &&
            Object.keys(fieldsState.riskLine).length > 0 && (
              <RiskLineTable
                riskLine={fieldsState.riskLine as unknown as RiskLineDto}
              />
            )}
          <Input
            error={feedbackErrors.office}
            name="office"
            placeholder={t('office')}
            readOnly={!!office}
            value={fieldsState.office || ''}
            onChange={(val: string) => setFieldValue('office', val)}
          />
          <StTextarea
            error={feedbackErrors.comments}
            maxLength={500}
            optional
            placeholder={t('comments')}
            value={fieldsState.comments || ''}
            onChange={(val) => setFieldValue('comments', val)}
          />
          <StButtonContainerRight>
            <Button label={t('continue')} wide onClick={handleSubmit} />
          </StButtonContainerRight>
        </form>
        <SummaryCard
          {...onSummarizeFormData!(['customer'])}
          direction="vertical"
        />
      </FormStepContainer>
    )
  );
};

export default Request;
