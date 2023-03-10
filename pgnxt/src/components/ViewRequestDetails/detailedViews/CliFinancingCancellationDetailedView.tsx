import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/financingCancellation/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliFinancingCancellationDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliFinancingCancellationDetailedView: React.FC<
  CliFinancingCancellationDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.financingCancellation');
  const { request } = requestDetails || {};
  const requestStep = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-financing-cancellation-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{requestStep?.financingRequest?.code}</span>
      </div>
      <div>
        <span>{t('contractRef')}</span>
        <span className="bold">
          {requestStep?.financingRequest?.contractReference}
        </span>
      </div>
      <div>
        <span>{t('financingRef')}</span>
        <span className="bold">
          {requestStep?.financingRequest?.financingReference}
        </span>
      </div>
      <div>
        <span>{t('expirationDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(requestStep?.financingRequest?.expirationDate || ''),
          )}
        </span>
      </div>
      <div>
        <span>{t('financingAmount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${requestStep?.financingRequest?.currency}`}
            value={requestStep?.financingRequest?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('cancellationAmount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${requestStep?.currency.currency}`}
            value={requestStep?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('accountInCharge')}</span>
        <span className="bold">{requestStep?.account?.iban}</span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{requestStep?.office}</span>
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
        <span className="bold">{requestStep?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CliFinancingCancellationDetailedView;
