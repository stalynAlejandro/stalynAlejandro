import React, { useEffect } from 'react';
import { object, string, InferType } from 'yup';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';

import { FormStepContainer } from '../../../../../components/FormStepContainer';
import { StepProps } from '../../../../common/types/StepProps';
import { StButtonContainerRight, StTextarea } from '../../../../FormStyled';
import { Button } from '../../../../../components/Button';
import { Select } from '../../../../../components/Controls/Select';
import { useFieldsState } from '../../../../../hooks/useFieldsState';
import { defaultIfEmpty } from '../../../../../utils/defaultIfEmpty';
import { SummaryCard } from '../../../../../components/SummaryCard';
import { Table } from '../../../../../components/Table';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import { Currency } from '../../../../../components/Currency';
import { addDaysToDate, formatDate } from '../../../../../utils/dates';
import { CustomerCollection as CustomerCollectionComponent } from '../../../../../components/Controls/Select/OptionComponents/CustomerCollection';
import { textIncludes } from '../../../../../helpers/textIncludes';
import { Input } from '../../../../../components/Controls/Input';
import {
  useFetchCurrencies,
  useFetchCustomerAccounts,
  useFetchCustomerCliCollections,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { getUser } from '../../../../../redux/selectors/user';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';
import { AccountDto } from '../../../../../api/types/AccountDto';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import { RiskLine } from '../../../../../components/Controls/Select/OptionComponents/RiskLine';
import DaysDateSelector from '../../../../../components/Controls/DaysDateSelector/DaysDateSelector';

const fieldsSchema = object({
  account: object().required(),
  amount: string().required(),
  comments: string().ensure(),
  currency: object().required(),
  expirationDate: string().ensure().when('expirationType', {
    is: 'date',
    then: string().required(),
  }),
  expirationDays: string().ensure().when('expirationType', {
    is: 'days',
    then: string().required(),
  }),
  expirationType: string().ensure().required(),
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
  const { t } = useFormTranslation('cli.financingRequest.create');
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
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLI,
    eventTypes.PAYMENT_CHARGE,
  );
  const { customerAccounts } = useFetchCustomerAccounts(
    formData.customer.personNumber,
  );
  const { customerCollections } = useFetchCustomerCliCollections(
    formData.customer.personNumber,
  );
  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.amount,
    currency: fieldsState.currency?.currency,
    expirationDate:
      fieldsState.expirationDate ||
      (addDaysToDate(new Date(), fieldsState.expirationDays) as string),
    personNumber: formData.customer.personNumber,
    product: productTypes.CLI,
  });

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
    <FormStepContainer
      stepNumber={stepNumber || 2}
      title={t('completeOperationData')}
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
          error={feedbackErrors.account}
          name="account"
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
          placeholder={t('financingAccount')}
          value={fieldsState.account}
          variant="pijama"
          onChange={(val) => {
            setFieldValue('account', val);
          }}
        />
        <InputSelect
          error={feedbackErrors.amount || feedbackErrors.currency}
          name="amount"
          options={mappedCurrencies}
          placeholder={t('amount')}
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
        <DaysDateSelector
          error={
            feedbackErrors.expirationType ||
            feedbackErrors.expirationDate ||
            feedbackErrors.expirationDays
          }
          placeholder={t('financingExp')}
          value={{
            date: fieldsState.expirationDate,
            days: fieldsState.expirationDays,
            type: fieldsState.expirationType as any,
          }}
          onChange={(exp) => {
            setFieldValue('expirationDate', exp.date);
            setFieldValue('expirationDays', exp.days);
            setFieldValue('expirationType', exp.type);
          }}
        />
        <Select
          className="form-field--wide"
          error={feedbackErrors.riskLine}
          filterOption={(
            { value: { currency, expires, iban, status } = {} }: { value: any },
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
            component: RiskLine,
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
  );
};

export default Request;
