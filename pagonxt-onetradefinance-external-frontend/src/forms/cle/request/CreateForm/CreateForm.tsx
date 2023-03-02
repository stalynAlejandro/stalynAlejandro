import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import formSteps from './steps';
import { CreateFormDataDto } from '../../../../api/types/cle/request/CreateFormDataDto';
import { RecursivePartial } from '../../../../types/RecursivePartial';
import { NewCollectionSuccess } from '../../../../components/NotificationToast/Notifications/NewCollectionSuccess';
import { fetchServer } from '../../../../utils/fetchServer';
import ApiUrls from '../../../../constants/apiUrls';
import Navigation from '../../../../constants/navigation';
import { ApiResponse } from '../../../../api/types/ApiResponse';
import { NotificationToast } from '../../../../components/NotificationToast';
import useSingleFetch from '../../../../hooks/useSingleFetch';
import { Loader } from '../../../../components/Loader';
import { serializeNewCollection } from '../../../../helpers/mappers/serializers/cle/request/serialize';
import { summarizeNewCollection } from '../../../../helpers/mappers/summarizers/summarizeNewCollection';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { CreateApiDataDto } from '../../../../api/types/cle/request/CreateApiDataDto';
import { StFormWizard } from '../../../FormStyled';
import { formDefaultProps, FormProps } from '../../../common/types/FormProps';
import { defaultJsonHeaders } from '../../../../constants/defaultJsonHeaders';

const CreateForm: React.FC<FormProps> = ({ initialFormData, initialStep }) => {
  const { t } = useTranslation();
  const { collectionRef } = useParams();
  const navigate = useNavigate();

  const { fetchData: fetchFinishForm, isLoading: finishFormIsLoading } =
    useSingleFetch<ApiResponse<any>>(ApiUrls.cle.request.create.confirm);
  const { fetchData: fetchOnSaveDraft, isLoading: saveDraftIsLoading } =
    useSingleFetch<ApiResponse<any>>(ApiUrls.cle.request.create.saveDraft);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<RecursivePartial<CreateFormDataDto>>(
    initialFormData || {
      advance: {},
      customer: {},
      documentation: {},
      operationDetails: {},
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

  const onSaveDraft = async (userTriggered: boolean = true) => {
    const serializedFormData = await serializeNewCollection(formData);

    try {
      const response = await fetchOnSaveDraft({
        body: JSON.stringify(serializedFormData),
        headers: defaultJsonHeaders,
        method: 'post',
      });

      if (response === null) {
        return null;
      }

      // Replace the code property with the one generated in the backend
      if (response.entity.code) {
        setFormData((current) => ({ ...current, code: response.entity.code }));
      }

      // Replace files array with the new files with new IDs generated in the backend
      if (response.entity.documentation?.files) {
        setFormData((current) => ({
          ...current,
          documentation: {
            ...current.documentation,
            files: [...response.entity.documentation.files],
          },
        }));
      }

      if (userTriggered) {
        NotificationToast.success(
          <NewCollectionSuccess
            clientName={serializedFormData.customer.name}
            priority={t(serializedFormData.documentation.priority)}
            reference={response.entity?.code || serializedFormData.code || ''}
            subtitle={t('collectionExportationAdmission')}
            title={t('collectionDraftSavedSuccessfully')}
          />,
          {
            toastId: 'draft-saved',
          },
        );

        goBackPage();
      }

      return response;
    } catch (err) {
      NotificationToast.error(getErrorMessage(err), {
        toastId: 'draft-error',
      });
    }

    return false;
  };

  const onFinishForm = async () => {
    const serializedFormData = await serializeNewCollection(formData);

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
          subtitle={t('collectionExportationAdmission')}
          title={t('collectionCreatedSuccessfully')}
        />,
        {
          toastId: 'collection-created',
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

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);

      try {
        const resp = await fetchServer<ApiResponse<CreateApiDataDto>>(
          ApiUrls.cle.request.create.get(collectionRef!),
        );
        setIsLoading(false);

        if (resp?.entity) {
          setFormData(resp.entity);

          let continueStep = 0;
          if (resp.entity?.savedStep) {
            continueStep = resp.entity.savedStep;
          } else if (resp.entity?.customer?.personNumber) {
            continueStep = 1;
          }

          setCurrentStep(continueStep);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };

    if (collectionRef) {
      fetchCollectionData();
    }
  }, []);

  return (
    <StFormWizard
      actualStep={currentStep}
      canGoBack={currentStep > 1}
      hideProgressBar={currentStep === formSteps.length - 1}
      stepList={formSteps}
      title={t('collectionExportationAdmission')}
      onClose={onClose}
      onFinish={currentStep === formSteps.length - 1 ? onFinishForm : undefined}
      onSaveDraft={currentStep >= 2 ? onSaveDraft : undefined}
      onStepChange={changeStep}
    >
      {(saveDraftIsLoading || finishFormIsLoading || isLoading) && <Loader />}
      <StepComponent
        formData={formData}
        stepNumber={currentStep + 1}
        onDataChange={(data) =>
          updateFormData(formSteps[currentStep].key, data)
        }
        onSaveDraft={onSaveDraft}
        onStepChange={changeStep}
        onSubmitStep={onSubmitStep}
        onSummarizeFormData={(includedSteps) =>
          summarizeNewCollection(
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
