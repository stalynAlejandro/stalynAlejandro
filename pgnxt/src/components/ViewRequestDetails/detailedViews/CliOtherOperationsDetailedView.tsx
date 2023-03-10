import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/otherOperations/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliOtherOperationsDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliOtherOperationsDetailedView: React.FC<
  CliOtherOperationsDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useTranslation();
  const { request } = requestDetails || {};
  const importOtherOperations = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-other-operations-detailed-view"
    >
      <div>
        <span>{t('operationType')}</span>
        <span className="bold">
          {importOtherOperations?.operationType
            ? t(`operationTypes.${importOtherOperations?.operationType}`)
            : ''}
        </span>
      </div>
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{request?.code}</span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(
              importOtherOperations?.importCollection?.creationDate || '',
            ),
          )}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importOtherOperations?.importCollection?.currency}`}
            value={importOtherOperations?.importCollection?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{importOtherOperations?.office}</span>
      </div>
      <div>
        <span>{t('attachedDocumentation')}</span>
        <span className="bold">
          {documentationFiles?.length ? t('yes') : t('no')}
        </span>
        {!!documentationFiles?.length &&
          documentationFiles.map((file) => (
            <StDocumentationFile
              key={`documentation-file-${file.name}`}
              icon="file"
              label={file.name}
              onClick={() => openFileWindow(file)}
            />
          ))}
      </div>
      <div className="wide">
        <span>{t('additionalComments')}</span>
        <span className="bold">{importOtherOperations?.comments}</span>
      </div>
    </div>
  );
};

export default CliOtherOperationsDetailedView;
