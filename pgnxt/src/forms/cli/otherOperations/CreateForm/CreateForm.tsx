import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import formSteps from './steps';
import { RecursivePartial } from '../../../../types/RecursivePartial';
import { NewCollectionSuccess } from '../../../../components/NotificationToast/Notifications/NewCollectionSuccess';
import ApiUrls from '../../../../constants/apiUrls';
import Navigation from '../../../../constants/navigation';
import { ApiResponse } from '../../../../api/types/ApiResponse';
import { NotificationToast } from '../../../../components/NotificationToast';
import useSingleFetch from '../../../../hooks/useSingleFetch';
import { Loader } from '../../../../components/Loader';
import { serializeCliOtherCollection } from '../../../../helpers/mappers/serializers/cli/otherOperations/serialize';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { CreateFormDataDto } from '../../../../api/types/cli/otherOperations/CreateFormDataDto';
import { StFormWizard } from '../../../FormStyled';
import { useFormTranslation } from '../../../../hooks/useFormTranslation';
import { summarizeCliOtherOperationsCreation } from '../../../../helpers/mappers/summarizers/summarizeCliOtherOperationsCreation';
import { defaultJsonHeaders } from '../../../../constants/defaultJsonHeaders';
import { formDefaultProps, FormProps } from '../../../common/types/FormProps';

const CreateForm: React.FC<FormProps> = ({ initialFormData, initialStep }) => {
  const { t } = useFormTranslation('cli.otherOperations.create');
  const navigate = useNavigate();

  const { fetchData: fetchFinishForm, isLoading: finishFormIsLoading } =
    useSingleFetch<ApiResponse<any>>(
      ApiUrls.cli.otherOperations.create.confirm,
    );
  const [formData, setFormData] = useState<RecursivePartial<CreateFormDataDto>>(
    initialFormData || {
      customer: {},
      documentation: {},
      request: {},
    },
  );
  const [currentStep, setCurrentStep] = useState(initialStep || 0);

  const goBackPage = () => {
    navigate(Navigation.newRequests, { replace: true });
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
    const serializedFormData = await serializeCliOtherCollection(formData);

    try {
      const response = await fetchFinishForm({
        body: JSON.stringify(serializedFormData),
        headers: defaultJsonHeaders,
        method: 'put',
      });

      if (response === null) {
        return;
      }

      NotificationToast.success(
        <NewCollectionSuccess
          clientName={serializedFormData.customer.name}
          priority={t(serializedFormData.documentation.priority)}
          reference={response.entity?.code || serializedFormData.code || ''}
          subtitle={t('title')}
          title={t('notifications.requestCreatedSuccessfully')}
        />,
        {
          toastId: 'other-operation-created',
        },
      );

      goBackPage();
    } catch (err) {
      NotificationToast.error(getErrorMessage(err), {
        toastId: 'other-operation-creation-error',
      });
    }
  };

  const StepComponent = formSteps[currentStep]?.component;

  useEffect(() => {
    setFormData((current) => ({ ...current, savedStep: currentStep }));
  }, [currentStep]);

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
      {finishFormIsLoading && <Loader />}
      <StepComponent
        formData={formData}
        stepNumber={currentStep + 1}
        onDataChange={(data) =>
          updateFormData(formSteps[currentStep].key, data)
        }
        onStepChange={changeStep}
        onSubmitStep={onSubmitStep}
        onSummarizeFormData={(includedSteps) =>
          summarizeCliOtherOperationsCreation(
            formData as CreateFormDataDto,
            includedSteps,
            changeStep,
            t,
          )
        }
        onUpdateFormData={setFormData}
      />
    </StFormWizard>
  );
};

CreateForm.defaultProps = formDefaultProps;

export default CreateForm;
