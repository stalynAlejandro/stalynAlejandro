import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import formSteps from './steps';
import { RecursivePartial } from '../../../../types/RecursivePartial';
import { NewCollectionSuccess } from '../../../../components/NotificationToast/Notifications/NewCollectionSuccess';
import ApiUrls from '../../../../constants/apiUrls';
import Navigation from '../../../../constants/navigation';
import { ApiResponse } from '../../../../api/types/ApiResponse';
import { NotificationToast } from '../../../../components/NotificationToast';
import useSingleFetch from '../../../../hooks/useSingleFetch';
import { Loader } from '../../../../components/Loader';
import { serializeCliRequestCreation } from '../../../../helpers/mappers/serializers/cli/request/serialize';
import { summarizeCliRequestCreation } from '../../../../helpers/mappers/summarizers/summarizeCliRequestCreation';
import { RequestDetailsDto } from '../../../../api/types/RequestDetailsDto';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { getResponseWarning } from '../../../../utils/getResponseWarning';
import { CompleteInformationFormDataDto } from '../../../../api/types/cli/request/CompleteInformationFormDataDto';
import { CreateApiDataDto } from '../../../../api/types/cli/request/CreateApiDataDto';
import { StFormWizard } from '../../../FormStyled';
import { FormProps } from '../../../common/types/FormProps';
import { defaultJsonHeaders } from '../../../../constants/defaultJsonHeaders';
import { useFormTranslation } from '../../../../hooks/useFormTranslation';

const CompleteInformationForm: React.FC<FormProps> = ({
  initialFormData,
  initialStep,
}) => {
  const { t } = useFormTranslation('cli.request.completeInformation');
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { fetchData: fetchRequestData } = useSingleFetch<
    ApiResponse<RequestDetailsDto<CreateApiDataDto>>
  >(`${ApiUrls.cli.request.completeInformation.get(taskId!, true)}`);
  const { fetchData: fetchFinishForm } = useSingleFetch<ApiResponse<any>>(
    ApiUrls.cli.request.completeInformation.complete(taskId!),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    RecursivePartial<CompleteInformationFormDataDto>
  >(
    initialFormData || {
      customer: {},
      documentation: {},
      operationDetails: {},
    },
  );
  const [currentStep, setCurrentStep] = useState(initialStep || 0);

  const goBackPage = () => {
    navigate(Navigation.pendingTasks, { replace: true });
  };

  const changeStep = (step: number) => {
    let finalStep = step;
    if (finalStep < 0) {
      finalStep = 0;
    }
    if (finalStep > formSteps.length - 1) {
      finalStep = formSteps.length - 1;
    }
    setCurrentStep(finalStep);
  };

  const nextStep = () => {
    changeStep(currentStep + 1);
  };

  const onClose = () => {
    goBackPage();
  };

  const updateFormData = (stepKey: string, data: any) => {
    setFormData((current: any) => ({ ...current, [stepKey]: data }));
  };

  const onSubmitStep = () => {
    nextStep();
  };

  const onFinishForm = async () => {
    const serializedFormData = await serializeCliRequestCreation(formData);

    try {
      setIsLoading(true);
      const response = await fetchFinishForm({
        body: JSON.stringify(serializedFormData),
        headers: defaultJsonHeaders,
        method: 'put',
      });

      if (response === null) {
        setIsLoading(false);
        return;
      }

      // Give time to the DB to update its data so that Pending Tasks Table show synced data
      setTimeout(() => {
        setIsLoading(false);

        NotificationToast.success(
          <NewCollectionSuccess
            clientName={serializedFormData.customer.name}
            priority={t(serializedFormData.documentation.priority)}
            reference={response.entity?.code || serializedFormData.code || ''}
            subtitle={t('title')}
            title={t('notifications.requestCreatedSuccessfully')}
          />,
          {
            toastId: 'request-complete-information-success',
          },
        );

        goBackPage();
      }, 500);
    } catch (err) {
      setIsLoading(false);
      NotificationToast.error(getErrorMessage(err), {
        toastId: 'request-complete-information-error',
      });
    }
  };

  const StepComponent = formSteps[currentStep]?.component;

  useEffect(() => {
    setFormData((current) => ({ ...current, savedStep: currentStep }));
  }, [currentStep]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const resp = await fetchRequestData();

        const warning = getResponseWarning(resp);
        if (warning) {
          NotificationToast.warning(
            t(`warnings.completeInformation.${warning}`, { ns: 'common' }),
            {
              toastId: 'edited-task-warning',
            },
          );
        }

        if (resp?.entity) {
          setFormData(resp.entity.request);
          setCurrentStep(formSteps.length - 1); // Set the last step as the first screen must be the Confirmation one
        }
      } catch (err) {
        NotificationToast.error(
          t('errors.requests.noDataAvailable', { ns: 'common' }),
          {
            toastId: 'request-no-data',
          },
        );
        goBackPage();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <StFormWizard
      actualStep={currentStep}
      canGoBack={currentStep > 1}
      hideProgressBar={currentStep === formSteps.length - 1}
      stepList={formSteps}
      title={t('title')}
      onClose={onClose}
      onFinish={currentStep === formSteps.length - 1 ? onFinishForm : undefined}
      onStepChange={changeStep}
    >
      {isLoading && <Loader />}
      <StepComponent
        formData={formData}
        stepNumber={currentStep + 1}
        onDataChange={(data) =>
          updateFormData(formSteps[currentStep].key, data)
        }
        onStepChange={changeStep}
        onSubmitStep={onSubmitStep}
        onSummarizeFormData={(includedSteps) =>
          summarizeCliRequestCreation(
            formData as CompleteInformationFormDataDto,
            includedSteps,
            changeStep,
          )
        }
        onUpdateFormData={setFormData}
      />
    </StFormWizard>
  );
};

export default CompleteInformationForm;
