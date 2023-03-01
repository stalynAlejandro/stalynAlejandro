import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/financingRequest/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliFinancingRequestDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliFinancingRequestDetailedView: React.FC<
  CliFinancingRequestDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.financingRequest');
  const { request } = requestDetails || {};
  const requestStep = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-financing-request-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{requestStep?.importCollection?.code}</span>
      </div>
      <div>
        <span>{t('contractRef')}</span>
        <span className="bold">
          {requestStep?.importCollection?.contractReference}
        </span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(requestStep?.importCollection?.creationDate || ''),
          )}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${requestStep?.importCollection?.currency}`}
            value={requestStep?.importCollection?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('financingAccount')}</span>
        <span className="bold">{requestStep?.account?.iban}</span>
      </div>
      <div>
        <span>{t('financingAmount')}</span>
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
        <span>{t('financingExp')}</span>
        <span className="bold">
          {requestStep?.expirationType === 'days'
            ? t('nDays', {
                count: Number.parseInt(requestStep.expirationDays, 10),
                ns: 'common',
              })
            : formatDate(new Date(requestStep?.expirationDate!))}
        </span>
      </div>
      <div>
        <span>{t('riskLine')}</span>
        <span className="bold">{requestStep?.riskLine?.iban}</span>
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

export default CliFinancingRequestDetailedView;
