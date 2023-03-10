import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { object, string, InferType, array } from 'yup';

import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';
import {
  useFetchCurrencies,
  useFetchCustomerAccounts,
  useFetchCustomerCliCollections,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { Table } from '../../../../../components/Table';
import { Input } from '../../../../../components/Controls/Input';
import { Button } from '../../../../../components/Button';
import { Select } from '../../../../../components/Controls/Select';
import { getUser } from '../../../../../redux/selectors/user';
import { Currency } from '../../../../../components/Currency';
import { StepProps } from '../../../../common/types/StepProps';
import { AccountDto } from '../../../../../api/types/AccountDto';
import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import { SummaryCard } from '../../../../../components/SummaryCard';
import { StepSubtitle } from '../../../../../components/StepSubtitle';
import { textIncludes } from '../../../../../helpers/textIncludes';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import { DaysDateValue } from '../../../../../components/Controls/DaysDateSelector/DaysDateSelector';
import { useFieldsState } from '../../../../../hooks/useFieldsState';
import { defaultIfEmpty } from '../../../../../utils/defaultIfEmpty';
import { DaysDateSelector } from '../../../../../components/Controls/DaysDateSelector';
import { FormStepContainer } from '../../../../../components/FormStepContainer';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import { ExchangeInsuranceDto } from '../../../../../api/types/ExchangeInsuranceDto';
import { CustomerCliRequestDto } from '../../../../../api/types/CustomerCliRequestDto';
import { ExchangeInsuranceSummary } from '../../../../../components/ExchangeInsuranceSummary';
import { addDaysToDate, formatDate } from '../../../../../utils/dates';
import { ExchangeInsuranceSelector } from '../../../../../containers/ExchangeInsuranceSelector';
import { RiskLine as RiskLineComponent } from '../../../../../components/Controls/Select/OptionComponents/RiskLine';
import { StButtonContainerRight, StTextarea } from '../../../../FormStyled';
import { CustomerCollection as CustomerCollectionComponent } from '../../../../../components/Controls/Select/OptionComponents/CustomerCollection';

const fieldsSchema = object({
  amount: string().required(),
  clientAccount: object().required(),
  comments: string().ensure().required(),
  commissionAccount: object().required(),
  currency: object().required(),
  exchangeInsurances: array().of(object()).nullable(),
  expirationDate: string()
    .ensure()
    .when('expirationType', { is: 'date', then: string().required() }),
  expirationDays: string()
    .ensure()
    .when('expirationType', { is: 'days', then: string().required() }),
  expirationType: string().required(),
  importCollection: object().nullable().required(),
  office: string()
    .ensure()
    .required()
    .test({
      name: 'office-format',
      test: (d) => /^\d{4}$/.test(d),
    }),
  riskLine: object().nullable().required(),
});

const Request: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useFormTranslation('cli.paymentFinancing.create');
  const { office } = useSelector(getUser);
  const initialData = {
    comments: '',
    office,
  };
  const { feedbackErrors, fieldsState, setFieldValue, validateFields } =
    useFieldsState<InferType<typeof fieldsSchema>>(
      fieldsSchema,
      defaultIfEmpty(formData.request, initialData),
    );
  const [exchangeInsuranceSelectorShown, setExchangeInsuranceSelectorShown] =
    useState(false);
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLI,
    eventTypes.PAYMENT_FINANCING,
  );
  const { customerAccounts } = useFetchCustomerAccounts(
    formData.customer.personNumber,
  );
  const { customerCollections } = useFetchCustomerCliCollections(
    formData.customer.personNumber,
  );
  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.amount,
    currency: fieldsState?.currency?.currency,
    expirationDate:
      fieldsState.expirationDate ||
      (addDaysToDate(new Date(), fieldsState.expirationDays) as string),
    personNumber: formData.customer.personNumber,
    product: productTypes.CLI,
  });

  const importCollection =
    fieldsState.importCollection as unknown as CustomerCliRequestDto;

  // Show the button if the currency of the nominal account is different from the advance currency
  const isExchangeInsuranceButtonShown =
    fieldsState.amount &&
    fieldsState.currency &&
    importCollection &&
    importCollection.nominalAccount?.currency !==
      fieldsState.currency.currency &&
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
        amount={fieldsState.amount!}
        currencyBuy={importCollection.nominalAccount?.currency}
        currencySell={fieldsState.currency!.currency!}
        customerId={formData.customer.personNumber}
        expirationDate={new Date().toJSON()}
        isBuyOperation={false}
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
            error={feedbackErrors.importCollection}
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
            name="importCollection"
            options={customerCollections?.map((data) => ({
              component: CustomerCollectionComponent,
              value: data,
            }))}
            placeholder={t('requestReference')}
            value={fieldsState.importCollection}
            valueKey="code"
            onChange={(val) => {
              setFieldValue('importCollection', val);
            }}
          />
          {fieldsState.importCollection &&
            Object.keys(fieldsState.importCollection).length > 0 && (
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
                  [`${fieldsState.importCollection.id}`]: {
                    amount: (
                      <NumberFormat
                        {...getNumberFormatProps()}
                        displayType="text"
                        value={fieldsState.importCollection.amount}
                      />
                    ),
                    approvalDate: formatDate(
                      new Date(fieldsState.importCollection.approvalDate),
                    ),
                    contractReference:
                      fieldsState.importCollection.contractReference,
                    currency: (
                      <Currency
                        currency={fieldsState.importCollection.currency || ''}
                        showFlag
                      />
                    ),
                    reference: fieldsState.importCollection.code,
                  },
                }}
                selectable={false}
              />
            )}
          <Select
            className="form-field--wide"
            error={feedbackErrors.clientAccount}
            name="clientAccount"
            options={[
              {
                label: t('accountsOfClient', {
                  client: formData.customer.name,
                }),
                options: customerAccounts?.map(
                  ({ currency, iban, id }: AccountDto) => ({
                    label: iban,
                    value: {
                      currency,
                      iban,
                      id,
                    },
                  }),
                ),
              },
            ]}
            placeholder={t('nominalAccount')}
            value={fieldsState.clientAccount}
            variant="pijama"
            onChange={(val) => {
              setFieldValue('clientAccount', val);
              setFieldValue('commissionAccount', val);
            }}
          />
          <Select
            className="form-field--wide"
            error={feedbackErrors.commissionAccount}
            name="commissionAccount"
            options={[
              {
                label: t('accountsOfClient', {
                  client: formData.customer.name,
                }),
                options: customerAccounts?.map(
                  ({ currency, iban, id }: AccountDto) => ({
                    label: iban,
                    value: {
                      currency,
                      iban,
                      id,
                    },
                  }),
                ),
              },
            ]}
            placeholder={t('commissionAccount')}
            value={fieldsState.commissionAccount}
            variant="pijama"
            onChange={(val) => setFieldValue('commissionAccount', val)}
          />
          <InputSelect
            error={feedbackErrors.amount || feedbackErrors.currency}
            name="amount"
            options={mappedCurrencies}
            placeholder={t('financingAmount')}
            type="number"
            value={{
              input: fieldsState.amount,
              select: fieldsState.currency || defaultCurrency,
            }}
            wide
            onChange={(val) => {
              setFieldValue('amount', val.input);
              setFieldValue('currency', val.select);
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
          <DaysDateSelector
            error={
              feedbackErrors.expirationType ||
              feedbackErrors.expirationDate ||
              feedbackErrors.expirationDays
            }
            placeholder={t('financingExp')}
            value={
              {
                date: fieldsState.expirationDate,
                days: fieldsState.expirationDays,
                type: fieldsState.expirationType,
              } as DaysDateValue
            }
            onChange={(val: DaysDateValue) => {
              setFieldValue('expirationDate', val?.date);
              setFieldValue('expirationDays', val?.days);
              setFieldValue('expirationType', val?.type);
            }}
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
