import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/modification/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleModificationDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleModificationDetailedView: React.FC<
  CleModificationDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useTranslation();

  const documentationFiles = requestDetails.request?.documentation?.files;
  const exportCollection = requestDetails.request?.exportCollection || {};

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-modification-detailed-view"
    >
      <div>
        <span>{t('requestReference')}</span>
        <span className="bold">{exportCollection.code}</span>
      </div>
      <div>
        <span>{t('accountNumber')}</span>
        <span className="bold">{exportCollection.nominalAccount?.iban}</span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${exportCollection.currency || ''}`}
            value={exportCollection.amount}
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
        <span className="bold">{requestDetails.request?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CleModificationDetailedView;
