import React, { useEffect } from 'react';
import { object, string, InferType } from 'yup';
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
import { Input } from '../../../../../components/Controls/Input';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import {
  useFetchCustomerAdvanceCollections,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { getUser } from '../../../../../redux/selectors/user';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';
import productTypes from '../../../../../enums/productTypes';

const fieldsSchema = object({
  comments: string().ensure(),
  exportCollectionAdvance: object().nullable().required(),
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
  const { t } = useFormTranslation('cle.advanceModification.create');
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
  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.exportCollectionAdvance?.amount,
    currency: fieldsState.exportCollectionAdvance?.currency,
    expirationDate: fieldsState.exportCollectionAdvance?.requestExpiration,
    personNumber: formData.customer.personNumber,
    product: productTypes.CLE,
  });

  const { customerAdvanceCollections } = useFetchCustomerAdvanceCollections(
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
      title={t('completeOperationData')}
      withLateralContent
    >
      <form>
        <Select
          className="form-field--wide"
          error={feedbackErrors.exportCollectionAdvance}
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
          name="exportCollectionAdvance"
          options={customerAdvanceCollections?.map((data) => ({
            component: CustomerCollectionComponent,
            value: data,
          }))}
          placeholder={t('requestReference')}
          value={fieldsState.exportCollectionAdvance}
          valueKey="code"
          onChange={(val) => {
            setFieldValue('exportCollectionAdvance', val);
          }}
        />
        {fieldsState.exportCollectionAdvance &&
          Object.keys(fieldsState.exportCollectionAdvance).length > 0 && (
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
                [`${fieldsState.exportCollectionAdvance.id}`]: {
                  amount: (
                    <NumberFormat
                      {...getNumberFormatProps()}
                      displayType="text"
                      value={fieldsState.exportCollectionAdvance.amount}
                    />
                  ),
                  approvalDate: formatDate(
                    new Date(fieldsState.exportCollectionAdvance.approvalDate),
                  ),
                  contractReference:
                    fieldsState.exportCollectionAdvance.contractReference,
                  currency: (
                    <Currency
                      currency={
                        fieldsState.exportCollectionAdvance.currency || ''
                      }
                      showFlag
                    />
                  ),
                  reference: fieldsState.exportCollectionAdvance.code,
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
  );
};

export default Request;
