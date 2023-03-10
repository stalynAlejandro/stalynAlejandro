import React, { useEffect } from 'react';
import { object, bool, string, InferType } from 'yup';
import { useSelector } from 'react-redux';

import { FormStepContainer } from '../../../../../components/FormStepContainer';
import { StepProps } from '../../../../common/types/StepProps';
import { StLabelHasAccount } from '../CreateFormStyled';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import { StButtonContainerRight, StTextarea } from '../../../../FormStyled';
import { Button } from '../../../../../components/Button';
import { RadioButton } from '../../../../../components/Controls/RadioButton';
import { Select } from '../../../../../components/Controls/Select';
import { useFieldsState } from '../../../../../hooks/useFieldsState';
import { AccountDto } from '../../../../../api/types/AccountDto';
import { defaultIfEmpty } from '../../../../../utils/defaultIfEmpty';
import { SummaryCard } from '../../../../../components/SummaryCard';
import { Input } from '../../../../../components/Controls/Input';
import {
  useFetchCollectionTypes,
  useFetchCurrencies,
  useFetchCustomerAccounts,
} from '../../../../../hooks/fetchDataHooks';
import { getUser } from '../../../../../redux/selectors/user';
import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';
import { useFormTranslation } from '../../../../../hooks/useFormTranslation';

export const fieldLimits = {
  beneficiaryBank: 50,
  beneficiaryName: 50,
  clientReference: 30,
};

const fieldsSchema = object({
  beneficiaryBank: string().ensure().max(fieldLimits.beneficiaryBank),
  beneficiaryName: string().ensure().max(fieldLimits.beneficiaryName),
  clientAccount: object().nullable().when('hasAccount', {
    is: true,
    then: object().required(),
  }),
  clientReference: string().ensure().max(fieldLimits.clientReference),
  collectionAmount: string().required(),
  collectionCurrency: object().required(),
  collectionType: string().required(),
  comments: string().ensure(),
  commissionAccount: object().nullable().when('hasAccount', {
    is: true,
    then: object().required(),
  }),
  hasAccount: bool(),
  office: string()
    .ensure()
    .required()
    .test({
      name: 'office-format',
      test: (d) => /^\d{4}$/.test(d),
    }),
});

const OperationDetails: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useFormTranslation('cli.request.create');
  const { office } = useSelector(getUser);

  const initialData = {
    collectionAmount: '',
    hasAccount: true,
    office,
  };

  const { feedbackErrors, fieldsState, setFieldValue, validateFields } =
    useFieldsState<InferType<typeof fieldsSchema>>(
      fieldsSchema,
      defaultIfEmpty(formData.operationDetails, initialData),
    );
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLI,
    eventTypes.REQUEST,
  );
  const { mappedCollectionTypes: collectionTypes } = useFetchCollectionTypes(
    productTypes.CLI,
    fieldsState.collectionCurrency?.currency,
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
        <StLabelHasAccount>
          <span>{t('clientHasAccount')}</span>
          <RadioButton
            checked={fieldsState.hasAccount}
            label={t('yes')}
            name="hasAccount"
            onClick={() => setFieldValue('hasAccount', true)}
          />
          <RadioButton
            checked={!fieldsState.hasAccount}
            label={t('no')}
            name="hasAccount"
            onClick={() => {
              setFieldValue('hasAccount', false);
              setFieldValue('clientAccount', undefined);
              setFieldValue('commissionAccount', undefined);
            }}
          />
        </StLabelHasAccount>
        {fieldsState.hasAccount && (
          <>
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
          </>
        )}
        <InputSelect
          error={
            feedbackErrors.collectionAmount || feedbackErrors.collectionCurrency
          }
          name="collectionAmount"
          options={mappedCurrencies}
          placeholder={t('collectionAmount')}
          type="number"
          value={{
            input: fieldsState.collectionAmount,
            select: fieldsState.collectionCurrency || defaultCurrency,
          }}
          wide
          onChange={(val) => {
            setFieldValue('collectionAmount', val.input);
            setFieldValue('collectionCurrency', val.select);
          }}
        />
        <Select
          error={feedbackErrors.collectionType}
          name="collectionType"
          options={collectionTypes}
          placeholder={t('collectionType')}
          value={fieldsState.collectionType}
          onChange={(val) => setFieldValue('collectionType', val)}
        />
        <Input
          error={feedbackErrors.clientReference}
          maxLength={fieldLimits.clientReference}
          optional
          placeholder={t('clientReference')}
          value={fieldsState.clientReference || ''}
          onChange={(val) => setFieldValue('clientReference', val)}
        />
        <Input
          error={feedbackErrors.beneficiaryName}
          maxLength={fieldLimits.beneficiaryName}
          optional
          placeholder={t('beneficiaryName')}
          value={fieldsState.beneficiaryName || ''}
          onChange={(val) => setFieldValue('beneficiaryName', val)}
        />
        <Input
          error={feedbackErrors.beneficiaryBank}
          maxLength={fieldLimits.beneficiaryBank}
          optional
          placeholder={t('beneficiaryBank')}
          value={fieldsState.beneficiaryBank || ''}
          onChange={(val) => setFieldValue('beneficiaryBank', val)}
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

export default OperationDetails;
