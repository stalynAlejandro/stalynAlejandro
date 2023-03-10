import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { array, bool, InferType, object, string } from 'yup';

import { Button } from '../../../components/Button';
import { FilePicker } from '../../../components/Controls/FilePicker';
import { FormStepContainer } from '../../../components/FormStepContainer';
import { StepSubtitle } from '../../../components/StepSubtitle';
import { TextButton } from '../../../components/TextButton';
import { useFieldsState } from '../../../hooks/useFieldsState';
import {
  StButtonContainerRight,
  StCloserSubtitle,
  StLineContainer,
  StRadioButtonCard,
  StCheckbox,
} from '../../FormStyled';
import { StepProps } from '../types/StepProps';
import { defaultIfEmpty } from '../../../utils/defaultIfEmpty';
import { SummaryCard } from '../../../components/SummaryCard';
import { NotificationToast } from '../../../components/NotificationToast';
import { DefaultNotification } from '../../../components/NotificationToast/Notifications/DefaultNotification';
import { FileActionItem } from '../../../components/FileActionItem';
import { FileProps } from '../../../types/FileProps';
import { openFileWindow } from '../../../utils/openFileWindow';

const fieldsSchema = object({
  clientAcceptance: bool().required().oneOf([true]),
  files: array()
    .of(object().nullable())
    .test({
      message: 'documentation files are mandatory',
      name: 'min-documentation',
      test: (buggedValue, ctx: any) => {
        const documentationFiles = ctx.originalValue?.filter(
          (f: FileProps) => f && f.documentType !== 'letter',
        );
        return !!documentationFiles.length;
      },
    }),
  priority: string().ensure().required(),
});

const DocumentationWithPriceLetter: React.FC<
  StepProps & {
    getPriceChartUrl: (requestId: string) => string;
    summarySteps: string[];
  }
> = ({
  formData,
  getPriceChartUrl,
  onDataChange,
  onSaveDraft,
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

  const priceLetterFile = fieldsState.files?.find(
    (f) => f?.documentType === 'letter',
  );
  const documentationFiles =
    fieldsState.files?.filter((f) => f?.documentType !== 'letter') || [];

  const handleSubmit = () => {
    if (validateFields()) {
      onDataChange(fieldsState);
      onSubmitStep();
    } else if (errors.files || errors.clientAcceptance) {
      NotificationToast.error(
        <DefaultNotification
          description="acceptanceAndDocumentationNeededDescription"
          title="acceptanceAndDocumentationNeeded"
        />,
        {
          toastId: 'acceptance-and-documentation-error',
        },
      );
    } else {
      NotificationToast.error(t('errors.validationError'), {
        toastId: 'documentation-error',
      });
    }
  };

  const openPricesChart = async (collectionRef: string = formData.code) => {
    if (collectionRef) {
      openFileWindow(undefined, getPriceChartUrl(collectionRef));
    }
  };

  const getPricesChart = async () => {
    if (onSaveDraft) {
      const response = await onSaveDraft(false);
      if (response) {
        openPricesChart(response.entity.code);
      }
    }
  };

  const deleteFile = (file: FileProps) => {
    setFieldValue('files', [
      ...((fieldsState.files as unknown as FileProps[])?.filter(
        (f) =>
          !(f?.name === file.name && f?.documentType === file.documentType),
      ) || []),
    ]);
  };

  useEffect(() => {
    onDataChange(fieldsState);
  }, [fieldsState]);

  return (
    <FormStepContainer
      stepNumber={stepNumber || 4}
      title={t('attachDocumentationAndPriority')}
      withLateralContent
    >
      <form>
        {/* Price Letter */}
        <StepSubtitle subtitle={t('priceLetter')} />
        <StLineContainer>
          <StCheckbox
            checked={!!fieldsState.clientAcceptance}
            label={t('clientAcceptsPrices')}
            onChange={(val) => setFieldValue('clientAcceptance', val)}
          />
          <TextButton
            icon="envelope-euro"
            label={t('priceLetter')}
            onClick={getPricesChart}
          />
        </StLineContainer>
        {!priceLetterFile && (
          <FilePicker
            accept={{
              'application/pdf': ['.pdf'],
              'image/jpeg': ['.jpg'],
              'image/png': ['.png'],
            }}
            buttonLabel={t('searchFile')}
            data-testid="letter-file-picker"
            documentType="letter"
            label={t('selectFileOrDrag')}
            maxFileSizeKb={10 * 1024}
            onLoad={(files) =>
              setFieldValue('files', [
                ...(fieldsState.files?.filter(
                  (f) => f?.documentType !== 'letter',
                ) || []),
                ...files,
              ])
            }
          />
        )}
        {priceLetterFile && (
          <FileActionItem
            file={priceLetterFile as unknown as FileProps}
            type="letter"
            onDelete={() => deleteFile(priceLetterFile as unknown as FileProps)}
          />
        )}

        {/* Documentation */}
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
          onLoad={(files) =>
            setFieldValue('files', [
              ...(fieldsState.files?.filter(
                (f) => f?.documentType === 'letter',
              ) || []),
              ...files,
            ])
          }
        />
        {!!documentationFiles?.length &&
          documentationFiles.map(
            (file) =>
              (file && (
                <FileActionItem
                  key={`file-${file.name}`}
                  file={file as unknown as FileProps}
                  type="documentation"
                  onDelete={() => deleteFile(file as unknown as FileProps)}
                />
              )) ||
              null,
          )}

        {/* Priority */}
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

        {/* Continue button */}
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

export default DocumentationWithPriceLetter;
