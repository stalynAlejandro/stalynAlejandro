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
import { formatDate } from '../../../../../utils/dates';
import { CustomerCollection as CustomerCollectionComponent } from '../../../../../components/Controls/Select/OptionComponents/CustomerCollection';
import { textIncludes } from '../../../../../helpers/textIncludes';
import {
  useFetchCurrencies,
  useFetchCustomerAccounts,
  useFetchCustomerCliFinancingRequests,
} from '../../../../../hooks/fetchDataHooks';
import { Input } from '../../../../../components/Controls/Input';
import { getUser } from '../../../../../redux/selectors/user';
import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';
import { AccountDto } from '../../../../../api/types/AccountDto';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';

const fieldsSchema = object({
  account: object().required(),
  amount: string().ensure().required(),
  comments: string().ensure().required(),
  currency: object().nullable().required(),
  financingRequest: object().nullable().required(),
  office: string()
    .ensure()
    .required()
    .test({
      name: 'office-format',
      test: (d) => /^\d{4}$/.test(d),
    }),
});

const Request: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useFormTranslation('cli.financingCancellation.create');
  const { office } = useSelector(getUser);
  const initialData = {
    comments: '',
    financingRequest: null,
    office,
  };
  const { feedbackErrors, fieldsState, setFieldValue, validateFields } =
    useFieldsState<InferType<typeof fieldsSchema>>(
      fieldsSchema,
      defaultIfEmpty(formData.request, initialData),
    );
  const { financingRequests } = useFetchCustomerCliFinancingRequests(
    formData.customer.personNumber,
  );
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLI,
    eventTypes.FINANCING_CANCELLATION,
  );
  const { customerAccounts } = useFetchCustomerAccounts(
    formData.customer.personNumber,
  );

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
      title={t('completeClientAndOperationData')}
      withLateralContent
    >
      <form>
        <Select
          className="form-field--wide"
          error={feedbackErrors.financingRequest}
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
          name="financingRequest"
          options={financingRequests?.map((data) => ({
            component: CustomerCollectionComponent,
            value: data,
          }))}
          placeholder={t('collectionReference')}
          value={fieldsState.financingRequest}
          valueKey="code"
          onChange={(val) => {
            setFieldValue('financingRequest', val);
          }}
        />
        {fieldsState.financingRequest &&
          Object.keys(fieldsState.financingRequest).length > 0 && (
            <Table
              cols={[
                { key: 'reference', label: t('reference') },
                { key: 'approvalDate', label: t('issuanceDate') },
                { key: 'amount', label: t('amount') },
                { key: 'currency', label: t('currency') },
              ]}
              hideMetadata
              rows={{
                [`${fieldsState.financingRequest.id}`]: {
                  amount: (
                    <NumberFormat
                      {...getNumberFormatProps()}
                      displayType="text"
                      value={fieldsState.financingRequest!.amount}
                    />
                  ),
                  approvalDate: formatDate(
                    new Date(fieldsState.financingRequest.approvalDate),
                  ),
                  currency: (
                    <Currency
                      currency={fieldsState.financingRequest!.currency || ''}
                      showFlag
                    />
                  ),
                  reference: fieldsState.financingRequest.code,
                },
              }}
              selectable={false}
            />
          )}

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
          placeholder={t('accountInCharge')}
          value={fieldsState.account}
          variant="pijama"
          onChange={(val) => {
            setFieldValue('account', val);
          }}
        />
        <Input
          error={feedbackErrors.office}
          placeholder={t('applicantOffice')}
          readOnly={!!office}
          value={fieldsState.office || ''}
          onChange={(val) => setFieldValue('office', val)}
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
  );
};

export default Request;
