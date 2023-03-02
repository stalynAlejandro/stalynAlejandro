import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InferType, object, string } from 'yup';

import { Button } from '../../../components/Button';
import { Input } from '../../../components/Controls/Input';
import { FormStepContainer } from '../../../components/FormStepContainer';
import { StButtonContainerRight } from '../../FormStyled';
import { StepProps } from '../types/StepProps';
import { Table } from '../../../components/Table';
import { TableProps } from '../../../components/Table/Table';
import { useFieldsState } from '../../../hooks/useFieldsState';
import { CustomerDto } from '../../../api/types/CustomerDto';
import { defaultIfEmpty } from '../../../utils/defaultIfEmpty';
import { useFetchCustomers } from '../../../hooks/fetchDataHooks';
import { NotificationToast } from '../../../components/NotificationToast';
import { Loader } from '../../../components/Loader';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const fieldLimits = {
  name: 50,
  office: 10,
  personNumber: 50,
  taxId: 50,
};

const fieldsSchema = object({
  customerId: string().ensure(),
  name: string().ensure().required().max(fieldLimits.name),
  office: string().ensure().max(fieldLimits.office),
  personNumber: string().ensure().max(fieldLimits.personNumber),
  taxId: string().ensure().max(fieldLimits.taxId),
});

const Customer: React.FC<StepProps> = ({
  formData,
  onDataChange,
  onSubmitStep,
  stepNumber,
}) => {
  const { t } = useTranslation();
  const initialData = {};
  const {
    feedbackErrors,
    fieldsState,
    resetFieldsState,
    setFieldValue,
    validateFields,
  } = useFieldsState<InferType<typeof fieldsSchema>>(
    fieldsSchema,
    defaultIfEmpty(
      {
        ...formData.client,
      },
      initialData,
    ),
  );

  const {
    customers = [],
    fetchCustomers,
    isLoading,
  } = useFetchCustomers(fieldsState as any, {
    autofetch: false,
  });
  const [clientsRows, setClientsRows] = useState<TableProps['rows']>({});
  const [selectedClient, setSelectedClient] = useState('');

  const searchCustomers = async () => {
    if (!validateFields()) {
      return;
    }

    let response;

    try {
      response = await fetchCustomers();
    } catch (err: any) {
      NotificationToast.error(getErrorMessage(err, { context: 'customer' }), {
        toastId: 'customer-search-error',
      });
      return;
    }

    if (response && response.length) {
      const newCustomers: TableProps['rows'] = {};

      response.forEach(
        ({ name, personNumber, segment, taxId }: CustomerDto) => {
          newCustomers[personNumber] = {
            name,
            personNumber,
            segment,
            taxId,
          };
        },
      );

      setClientsRows(newCustomers);
    } else {
      // eslint-disable-next-line no-console
      console.error('Response without data: ', response);
    }
  };

  const onClientSelect = (clientId: string) => {
    setSelectedClient(clientId);
  };

  const handleDataChange = () => {
    const client =
      customers.find((cl) => cl.personNumber === selectedClient) ||
      customers[0];
    onDataChange({ ...client });
  };

  const handleSubmit = () => {
    if (selectedClient) {
      handleDataChange();
      onSubmitStep();
    }
  };

  useEffect(() => {
    handleDataChange();
  }, [selectedClient]);

  return (
    <FormStepContainer stepNumber={stepNumber || 1} title={t('selectAClient')}>
      {isLoading && <Loader primary={false} />}
      <form>
        <Input
          error={feedbackErrors.name}
          maxLength={fieldLimits.name}
          placeholder={t('clientName')}
          value={fieldsState.name}
          onChange={(val) => setFieldValue('name', val)}
        />
        <Input
          error={feedbackErrors.taxId}
          maxLength={fieldLimits.taxId}
          optional
          placeholder={t('taxId')}
          value={fieldsState.taxId}
          onChange={(val) => setFieldValue('taxId', val)}
        />
        <Input
          error={feedbackErrors.personNumber}
          maxLength={fieldLimits.personNumber}
          optional
          placeholder={t('personNumber')}
          value={fieldsState.personNumber}
          onChange={(val) => setFieldValue('personNumber', val)}
        />
        <Input
          error={feedbackErrors.office}
          maxLength={fieldLimits.office}
          optional
          placeholder={t('office')}
          value={fieldsState.office}
          onChange={(val) => setFieldValue('office', val)}
        />
        <StButtonContainerRight>
          <Button inverse label={t('clean')} onClick={resetFieldsState} />
          <Button label={t('search')} onClick={searchCustomers} />
        </StButtonContainerRight>
        {Object.keys(clientsRows).length > 0 && (
          <>
            <Table
              cols={[
                {
                  key: 'name',
                  label: t('clientName'),
                },
                {
                  key: 'taxId',
                  label: t('taxId'),
                },
                {
                  key: 'personNumber',
                  label: t('personNumber'),
                },
                {
                  key: 'segment',
                  label: t('segment'),
                },
              ]}
              rows={clientsRows}
              onSelect={onClientSelect}
            />
            {selectedClient && (
              <StButtonContainerRight>
                <Button
                  disabled={!selectedClient}
                  label={t('continue')}
                  wide
                  onClick={handleSubmit}
                />
              </StButtonContainerRight>
            )}
          </>
        )}
      </form>
    </FormStepContainer>
  );
};

export default Customer;
