import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/request/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDataTitle, StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleRequestDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleRequestDetailedView: React.FC<CleRequestDetailedViewProps> = ({
  requestDetails,
}) => {
  const { t } = useTranslation();
  const documentationFiles = requestDetails.request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-request-detailed-view"
    >
      <div>
        <span>{t('accountNumber')}</span>
        <span className="bold">
          {requestDetails.request?.operationDetails?.clientAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('commissionAccount')}</span>
        <span className="bold">
          {requestDetails.request?.operationDetails?.commissionAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${requestDetails.request?.operationDetails?.collectionCurrency?.currency}`}
            value={requestDetails.request?.operationDetails?.collectionAmount}
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
        <span className="bold">
          {requestDetails.request?.operationDetails?.comments || '-'}
        </span>
      </div>
      {/* Do not display financing section if there is no data for it */}
      {requestDetails.request?.advance?.advanceAmount && (
        <>
          <StDataTitle subtitle={t('financing')} />
          <div>
            <span>{t('financingAmount')}</span>
            <span className="bold">
              <NumberFormat
                {...getNumberFormatProps()}
                displayType="text"
                suffix={` ${requestDetails.request?.advance?.advanceCurrency?.currency}`}
                value={requestDetails.request?.advance?.advanceAmount}
              />
            </span>
          </div>
          <div>
            <span>{t('expirationOfFinancing')}</span>
            <span className="bold">
              {formatDate(
                new Date(
                  requestDetails.request?.advance?.advanceExpiration || '',
                ),
              )}
            </span>
          </div>
          <div>
            <span>{t('riskLine')}</span>
            <span className="bold">
              {requestDetails.request?.advance?.riskLine?.iban}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CleRequestDetailedView;
