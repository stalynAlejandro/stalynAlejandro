import React from 'react';
import NumberFormat from 'react-number-format';

import { formatDate } from '../../../utils/dates';
import { openFileWindow } from '../../../utils/openFileWindow';
import { CreateApiDataDto } from '../../../api/types/cli/paymentFinancing/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';

interface CliPaymentFinancingDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliPaymentFinancingDetailedView: React.FC<
  CliPaymentFinancingDetailedViewProps
> = ({ requestDetails }) => {
  const { t } = useFormTranslation('cli.paymentFinancing');
  const { request } = requestDetails || {};
  const importPaymentFinancing = request?.request;
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-payment-financing-detailed-view"
    >
      <div>
        <span>{t('requestRef')}</span>
        <span className="bold">{request?.code}</span>
      </div>
      <div>
        <span>{t('contractRef')}</span>
        <span className="bold">
          {importPaymentFinancing?.importCollection?.contractReference}
        </span>
      </div>
      <div>
        <span>{t('requestDate')}</span>
        <span className="bold">
          {formatDate(
            new Date(
              importPaymentFinancing?.importCollection?.creationDate || '',
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
            suffix={` ${importPaymentFinancing?.importCollection?.currency}`}
            value={importPaymentFinancing?.importCollection?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('nominalAccount')}</span>
        <span className="bold">
          {importPaymentFinancing?.importCollection?.nominalAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('commissionAccount')}</span>
        <span className="bold">
          {importPaymentFinancing?.commissionAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('financingAmount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${importPaymentFinancing?.currency?.currency}`}
            value={importPaymentFinancing?.amount}
          />
        </span>
      </div>
      <div>
        <span>{t('financingExp')}</span>
        <span className="bold">
          {importPaymentFinancing?.expirationType === 'days'
            ? t('nDays', {
                count: Number.parseInt(
                  importPaymentFinancing?.expirationDays,
                  10,
                ),
              })
            : formatDate(new Date(importPaymentFinancing?.expirationDate!))}
        </span>
      </div>
      <div>
        <span>{t('riskLine')}</span>
        <span className="bold">{importPaymentFinancing?.riskLine?.iban}</span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{importPaymentFinancing?.office}</span>
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
        <span className="bold">{importPaymentFinancing?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CliPaymentFinancingDetailedView;
