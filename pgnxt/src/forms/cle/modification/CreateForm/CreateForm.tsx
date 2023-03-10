import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { serializeModifyCollection } from '../../../../helpers/mappers/serializers/cle/modification/serialize';
import { summarizeModifyCollection } from '../../../../helpers/mappers/summarizers/summarizeModifyCollection';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { CreateFormDataDto } from '../../../../api/types/cle/modification/CreateFormDataDto';
import { StFormWizard } from '../../../FormStyled';
import { defaultJsonHeaders } from '../../../../constants/defaultJsonHeaders';
import { formDefaultProps, FormProps } from '../../../common/types/FormProps';

const CreateForm: React.FC<FormProps> = ({ initialFormData, initialStep }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { fetchData: fetchFinishForm, isLoading: finishFormIsLoading } =
    useSingleFetch<ApiResponse<any>>(ApiUrls.cle.modification.create.confirm);
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
    const serializedFormData = await serializeModifyCollection(formData);

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
          reference={
            response.entity?.code ||
            serializedFormData.exportCollection?.code ||
            ''
          }
          subtitle={t('exportationCollectionModification')}
          title={t('requestModifiedSuccessfully')}
        />,
        {
          toastId: 'collection-modified',
        },
      );

      goBackPage();
    } catch (err) {
      NotificationToast.error(getErrorMessage(err), {
        toastId: 'collection-error',
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
      title={t('exportCollectionModification')}
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
          summarizeModifyCollection(
            formData as CreateFormDataDto,
            includedSteps,
            changeStep,
          )
        }
        onUpdateFormData={setFormData}
      />
    </StFormWizard>
  );
};

CreateForm.defaultProps = formDefaultProps;

export default CreateForm;
