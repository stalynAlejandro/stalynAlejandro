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
import { Input } from '../../../../../components/Controls/Input';
import {
  useFetchCustomerCliCollections,
  useFetchOperationTypes,
} from '../../../../../hooks/fetchDataHooks';
import { getUser } from '../../../../../redux/selectors/user';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';
import productTypes from '../../../../../enums/productTypes';

const fieldsSchema = object({
  comments: string().ensure(),
  importCollection: object().nullable().required(),
  office: string()
    .ensure()
    .required()
    .test({
      name: 'office-format',
      test: (d) => /^\d{4}$/.test(d),
    }),
  operationType: string().ensure().required(),
});

const Request: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useFormTranslation('cli.otherOperations.create');
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
  const { mappedOperationTypes } = useFetchOperationTypes(productTypes.CLI);
  const { customerCollections } = useFetchCustomerCliCollections(
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
          error={feedbackErrors.operationType}
          options={mappedOperationTypes}
          placeholder={t('operationType')}
          value={fieldsState.operationType}
          onChange={(val) => {
            setFieldValue('operationType', val);
          }}
        />
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
