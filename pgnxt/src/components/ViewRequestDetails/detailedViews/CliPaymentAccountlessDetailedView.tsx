import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/paymentAccountless/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliPaymentAccountlessDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliPaymentAccountlessDetailedView: React.FC<
  CliPaymentAccountlessDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.paymentAccountless');
  const { request } = requestDetails || {};
  const importPaymentAccountless = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-payment-accountless-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{request?.code}</span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(
              importPaymentAccountless?.importCollection?.creationDate || '',
            ),
          )}
        </span>
      </div>
      <div>
        <span>{t('amount', { ns: 'common' })}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importPaymentAccountless?.importCollection?.currency}`}
            value={importPaymentAccountless?.importCollection?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importPaymentAccountless?.currency?.currency}`}
            value={importPaymentAccountless?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{importPaymentAccountless?.office}</span>
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
          {importPaymentAccountless?.comments || '-'}
        </span>
      </div>
    </div>
  );
};

export default CliPaymentAccountlessDetailedView;
