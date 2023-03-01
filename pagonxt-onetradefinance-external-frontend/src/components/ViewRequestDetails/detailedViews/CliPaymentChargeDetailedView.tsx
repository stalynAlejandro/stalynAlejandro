import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/paymentCharge/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliPaymentChargeDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliPaymentChargeDetailedView: React.FC<
  CliPaymentChargeDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.paymentCharge');
  const { request } = requestDetails || {};
  const importPaymentCharge = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-payment-charge-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{request?.code}</span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(importPaymentCharge?.importCollection?.creationDate || ''),
          )}
        </span>
      </div>
      <div>
        <span>{t('amount', { ns: 'common' })}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importPaymentCharge?.currency?.currency}`}
            value={importPaymentCharge?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('nominalAccount')}</span>
        <span className="bold">{importPaymentCharge?.clientAccount?.iban}</span>
      </div>
      <div>
        <span>{t('commissionAccount')}</span>
        <span className="bold">
          {importPaymentCharge?.commissionAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('amount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importPaymentCharge?.importCollection.currency}`}
            value={importPaymentCharge?.importCollection?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{importPaymentCharge?.office}</span>
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
        <span className="bold">{importPaymentCharge?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CliPaymentChargeDetailedView;
