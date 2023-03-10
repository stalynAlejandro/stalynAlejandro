import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/modification/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliModificationDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliModificationDetailedView: React.FC<
  CliModificationDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.modification.create');
  const { request } = requestDetails || {};
  const importCollection = request?.importCollection || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-modification-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{importCollection?.code}</span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(new Date(importCollection?.creationDate || ''))}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importCollection.currency || ''}`}
            value={importCollection.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{request?.office}</span>
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
        <span className="bold">{request?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CliModificationDetailedView;
