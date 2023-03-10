import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/otherOperations/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleOtherOperationsDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleOtherOperationsDetailedView: React.FC<
  CleOtherOperationsDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useTranslation();

  const { request } = requestDetails || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-other-operations-detailed-view"
    >
      <div>
        <span>{t('operationType')}</span>
        <span className="bold">
          {request?.request?.operationType
            ? t(`operationTypes.${request?.request?.operationType}`)
            : ''}
        </span>
      </div>
      <div>
        <span>{t('requestReference')}</span>
        <span className="bold">{request?.code}</span>
      </div>
      <div>
        <span>{t('contractRef')}</span>
        <span className="bold">
          {request?.request?.exportCollection?.contractReference}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${request.request?.exportCollection?.currency}`}
            value={request.request?.exportCollection?.amount}
          />
        </span>
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
        <span className="bold">{request?.request?.comments}</span>
      </div>
    </div>
  );
};

export default CleOtherOperationsDetailedView;
