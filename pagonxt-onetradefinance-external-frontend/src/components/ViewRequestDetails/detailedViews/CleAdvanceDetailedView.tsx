import React from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cle/advance/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { formatDate } from '../../../utils/dates';
import { formatNumber } from '../../../utils/formatNumber';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDataTitle, StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CleAdvanceDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CleAdvanceDetailedView: React.FC<CleAdvanceDetailedViewProps> = ({
  requestDetails,
}) => {
  const { t } = useTranslation();

  const { request } = requestDetails || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cle-advance-detailed-view"
    >
      <div>
        <span>{t('accountNumber')}</span>
        <span className="bold">
          {request?.request?.exportCollection?.nominalAccount?.iban}
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
                suffix={` ${request.request?.advanceCurrency?.currency}`}
                value={request.request?.advanceAmount}
              />
            </span>
          </div>
          <div>
            <span>{t('expirationOfFinancing')}</span>
            <span className="bold">
              {formatDate(new Date(request?.request?.requestExpiration || ''))}
            </span>
          </div>
          <div>
            <span>{t('riskLine')}</span>
            <span className="bold">{request.request?.riskLine?.iban}</span>
          </div>
          {request.request?.exchangeInsurances?.length
            ? request.request?.exchangeInsurances.map(
                ({
                  buyCurrency,
                  exchangeInsuranceId,
                  exchangeRate,
                  useAmount,
                }) => (
                  <div>
                    <span>
                      {t('exchangeInsuranceIdNShort', {
                        id: exchangeInsuranceId,
                      })}
                    </span>
                    <span className="bold">{`${formatNumber(
                      exchangeRate,
                      4,
                    )} (${formatNumber(useAmount)} ${buyCurrency})`}</span>
                  </div>
                ),
              )
            : []}
        </>
      )}
    </div>
  );
};

export default CleAdvanceDetailedView;
