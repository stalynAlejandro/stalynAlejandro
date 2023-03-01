import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/advanceModification/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDataTitle, StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleAdvanceModificationDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleAdvanceModificationDetailedView: React.FC<
  CleAdvanceModificationDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useTranslation();

  const { request } = requestDetails || {};
  const { exportCollectionAdvance } = request?.request || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-advance-modification-detailed-view"
    >
      <div>
        <span>{t('requestReference')}</span>
        <span className="bold">{exportCollectionAdvance?.code}</span>
      </div>
      <div>
        <span>{t('accountNumber')}</span>
        <span className="bold">
          {exportCollectionAdvance?.exportCollection?.nominalAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${exportCollectionAdvance?.exportCollection?.currency}`}
            value={exportCollectionAdvance?.exportCollection?.amount}
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
      {/* Do not display financing section if there is no data for it */}
      {request?.request?.riskLine && (
        <>
          <StDataTitle subtitle={t('financing')} />
          <div>
            <span>{t('financingAmount')}</span>
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
            <span>{t('riskLine')}</span>
            <span className="bold">{request.request?.riskLine?.iban}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CleAdvanceModificationDetailedView;
