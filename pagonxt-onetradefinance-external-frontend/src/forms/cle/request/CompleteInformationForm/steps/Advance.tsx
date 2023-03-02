import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string, InferType } from 'yup';

import { RiskLineDto } from '../../../../../api/types/RiskLineDto';
import { Button } from '../../../../../components/Button';
import { DatePicker } from '../../../../../components/Controls/DatePicker';
import { InputSelect } from '../../../../../components/Controls/InputSelect';
import { Select } from '../../../../../components/Controls/Select';
import { RiskLine as RiskLineComponent } from '../../../../../components/Controls/Select/OptionComponents/RiskLine';
import { FormStepContainer } from '../../../../../components/FormStepContainer';
import { SummaryCard } from '../../../../../components/SummaryCard';
import { useFieldsState } from '../../../../../hooks/useFieldsState';
import { defaultIfEmpty } from '../../../../../utils/defaultIfEmpty';
import { StButtonContainerRight } from '../../../../FormStyled';
import { StepProps } from '../../../../common/types/StepProps';
import { textIncludes } from '../../../../../helpers/textIncludes';
import { RiskLineTable } from '../../../../../components/RiskLineTable';
import {
  useFetchCurrencies,
  useFetchRiskLines,
} from '../../../../../hooks/fetchDataHooks';
import { getNumberFormatProps } from '../../../../../utils/getNumberFormatProps';
import productTypes from '../../../../../enums/productTypes';
import eventTypes from '../../../../../enums/eventTypes';

const fieldsSchema = object().shape(
  {
    advanceAmount: string()
      .ensure()
      .when('riskLine', {
        is: (val: any) => val && Object.keys(val).length > 0,
        then: string().ensure().required(),
      }),
    advanceCurrency: object().nullable(),
    advanceExpiration: string()
      .ensure()
      .when('advanceAmount', {
        is: (val: string) => !!val,
        then: string().ensure().required(),
      }),
    riskLine: object()
      .nullable()
      .when('advanceAmount', {
        is: (val: string) => !!val,
        then: object().required(),
      }),
  },
  [['riskLine', 'advanceAmount']],
);

const Advance: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
}) => {
  const { t } = useTranslation();

  const initialData = {};
  const { feedbackErrors, fieldsState, setFieldValue, validateFields } =
    useFieldsState<InferType<typeof fieldsSchema>>(
      fieldsSchema,
      defaultIfEmpty(formData.advance, initialData),
    );
  const { riskLines } = useFetchRiskLines({
    amount: fieldsState.advanceAmount,
    currency: fieldsState.advanceCurrency?.currency,
    expirationDate: fieldsState.advanceExpiration,
    personNumber: formData.customer.personNumber,
    product: productTypes.CLE,
  });
  const { defaultCurrency, mappedCurrencies } = useFetchCurrencies(
    productTypes.CLE,
    eventTypes.REQUEST,
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
      stepNumber={stepNumber || 3}
      title={t('indicateAdvanceDetails')}
      withLateralContent
    >
      <form>
        <InputSelect
          error={feedbackErrors.advanceAmount || feedbackErrors.advanceCurrency}
          isAllowed={(values) =>
            getNumberFormatProps().isAllowed(
              values,
              Number.parseFloat(formData.operationDetails.collectionAmount),
            )
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
        <DatePicker
          error={feedbackErrors.advanceExpiration}
          placeholder={t('expiration')}
          value={fieldsState.advanceExpiration}
          onChange={(val) =>
            setFieldValue('advanceExpiration', val?.toISOString())
          }
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
          isClearable
          isSearchable
          options={riskLines?.map((data) => ({
            component: RiskLineComponent,
            value: data,
          }))}
          placeholder={t('riskLine')}
          value={fieldsState.riskLine}
          valueKey="riskLineId"
          onChange={(val) => setFieldValue('riskLine', val)}
        />
        {fieldsState.riskLine &&
          Object.keys(fieldsState.riskLine).length > 0 && (
            <RiskLineTable
              riskLine={fieldsState.riskLine as unknown as RiskLineDto}
            />
          )}
        <StButtonContainerRight>
          <Button
            label={
              fieldsState.advanceAmount ||
              Object.keys(fieldsState.riskLine || {}).length > 0
                ? t('continue')
                : t('omit')
            }
            wide
            onClick={handleSubmit}
          />
        </StButtonContainerRight>
      </form>
      <SummaryCard
        {...onSummarizeFormData!(['customer', 'operationDetails'])}
        direction="vertical"
      />
    </FormStepContainer>
  );
};

export default Advance;
