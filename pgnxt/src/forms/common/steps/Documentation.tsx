import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { array, InferType, object, string } from 'yup';

import { Button } from '../../../components/Button';
import { FilePicker } from '../../../components/Controls/FilePicker';
import { FormStepContainer } from '../../../components/FormStepContainer';
import { StepSubtitle } from '../../../components/StepSubtitle';
import { useFieldsState } from '../../../hooks/useFieldsState';
import {
  StButtonContainerRight,
  StCloserSubtitle,
  StRadioButtonCard,
} from '../../FormStyled';
import { StepProps } from '../types/StepProps';
import { defaultIfEmpty } from '../../../utils/defaultIfEmpty';
import { SummaryCard } from '../../../components/SummaryCard';
import { NotificationToast } from '../../../components/NotificationToast';
import { DefaultNotification } from '../../../components/NotificationToast/Notifications/DefaultNotification';
import { FileActionItem } from '../../../components/FileActionItem';
import { FileProps } from '../../../types/FileProps';

const fieldsSchema = object({
  files: array().of(object().nullable()).min(1),
  priority: string().ensure().required(),
});

const Documentation: React.FC<StepProps & { summarySteps?: string[] }> = ({
  formData,
  onDataChange,
  onSubmitStep,
  onSummarizeFormData,
  stepNumber,
  summarySteps,
}) => {
  const { t } = useTranslation();
  const initialData = { files: [] };
  const { errors, fieldsState, setFieldValue, validateFields } = useFieldsState<
    InferType<typeof fieldsSchema>
  >(fieldsSchema, defaultIfEmpty(formData.documentation, initialData));

  const handleSubmit = () => {
    if (validateFields()) {
      onDataChange(fieldsState);
      onSubmitStep();
    } else if (errors.files) {
      NotificationToast.error(
        <DefaultNotification
          description="documentationNeededDescription"
          title="documentationNeeded"
        />,
        {
          toastId: 'documentation-needed-error',
        },
      );
    } else {
      NotificationToast.error(t('errors.validationError'), {
        toastId: 'documentation-error',
      });
    }
  };

  useEffect(() => {
    onDataChange(fieldsState);
  }, [fieldsState]);

  return (
    <FormStepContainer
      stepNumber={stepNumber || 3}
      title={t('attachDocumentationAndPriority')}
      withLateralContent
    >
      <form>
        <StepSubtitle subtitle={t('documentation')} />
        <FilePicker
          accept={{
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg'],
            'image/png': ['.png'],
          }}
          buttonLabel={t('searchFile')}
          data-testid="document-file-picker"
          label={t('selectFileOrDrag')}
          maxFileSizeKb={10 * 1024}
          multiple
          onLoad={(files) => setFieldValue('files', files)}
        />
        {!!fieldsState.files?.length &&
          fieldsState.files.map(
            (file) =>
              (file && (
                <FileActionItem
                  key={`file-${file.name}`}
                  file={file as unknown as FileProps}
                  onDelete={() =>
                    setFieldValue('files', [
                      ...(fieldsState.files?.filter(
                        (f) => f?.name !== file.name,
                      ) || []),
                    ])
                  }
                />
              )) ||
              null,
          )}
        <StCloserSubtitle subtitle={t('priority')} />
        <StRadioButtonCard
          checked={fieldsState.priority === 'urgent'}
          label={t('urgent')}
          onClick={() => setFieldValue('priority', 'urgent')}
        />
        <StRadioButtonCard
          checked={fieldsState.priority === 'normal'}
          label={t('normal')}
          onClick={() => setFieldValue('priority', 'normal')}
        />
        <StButtonContainerRight>
          <Button label={t('continue')} wide onClick={handleSubmit} />
        </StButtonContainerRight>
      </form>
      <SummaryCard
        {...onSummarizeFormData!(summarySteps)}
        direction="vertical"
      />
    </FormStepContainer>
  );
};

Documentation.defaultProps = {
  summarySteps: ['customer', 'request'],
};

export default Documentation;
