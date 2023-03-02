import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  useFetchCustomerCliFinancingRequests,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { Input } from '../../../../../components/Controls/Input';
import { getUser } from '../../../../../redux/selectors/user';
import productTypes from '../../../../../enums/productTypes';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import { RiskLine } from '../../../../../components/Controls/Select/OptionComponents/RiskLine';

const fieldsSchema = object({
  comments: string().ensure().required(),
  financingRequest: object().nullable().required(),
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
  const { t } = useTranslation();
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
  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.financingRequest?.amount,
    currency: fieldsState.financingRequest?.currency,
    expirationDate: fieldsState.financingRequest?.expirationDate,
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
                [`${fieldsState.financingRequest.code}`]: {
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
