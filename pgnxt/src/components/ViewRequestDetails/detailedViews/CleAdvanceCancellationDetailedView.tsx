import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/advanceCancellation/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleAdvanceCancellationDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleAdvanceCancellationDetailedView: React.FC<
  CleAdvanceCancellationDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useTranslation();

  const { request } = requestDetails || {};
  const { exportCollectionAdvance } = request?.request || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-advance-cancellation-detailed-view"
    >
      <div>
        <span>{t('requestReference')}</span>
        <span className="bold">{exportCollectionAdvance?.code}</span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${exportCollectionAdvance?.currency}`}
            value={exportCollectionAdvance?.amount}
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

export default CleAdvanceCancellationDetailedView;
