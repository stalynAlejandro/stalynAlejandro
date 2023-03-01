import React from 'react';
import NumberFormat from 'react-number-format';

import { CreateApiDataDto } from '../../../api/types/cli/request/CreateApiDataDto';
import { RequestDetailsDto } from '../../../api/types/RequestDetailsDto';
import { useFormTranslation } from '../../../hooks/useFormTranslation';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { openFileWindow } from '../../../utils/openFileWindow';
import { StDocumentationFile } from '../ViewRequestDetailsStyled';

interface CliRequestDetailedViewProps {
  requestDetails: RequestDetailsDto<CreateApiDataDto>;
}

const CliRequestDetailedView: React.FC<CliRequestDetailedViewProps> = ({
  requestDetails,
}) => {
  const { t } = useFormTranslation('cli.request');
  const { request } = requestDetails || {};
  const { operationDetails } = request || {};
  const documentationFiles = request?.documentation?.files;

  return (
    <div
      className="viewRequestDetails__dataContent"
      data-testid="cli-request-detailed-view"
    >
      <div>
        <span>{t('nominalAccount')}</span>
        <span className="bold">{operationDetails?.clientAccount?.iban}</span>
      </div>
      <div>
        <span>{t('commissionAccount')}</span>
        <span className="bold">
          {operationDetails?.commissionAccount?.iban}
        </span>
      </div>
      <div>
        <span>{t('collectionAmount')}</span>
        <span className="bold">
          <NumberFormat
            {...getNumberFormatProps()}
            displayType="text"
            suffix={` ${operationDetails?.collectionCurrency?.currency}`}
            value={operationDetails?.collectionAmount}
          />
        </span>
      </div>
      <div>
        <span>{t('collectionType')}</span>
        <span className="bold">
          {t(`collectionTypes.${operationDetails?.collectionType}`, {
            ns: 'common',
          })}
        </span>
      </div>
      <div>
        <span>{t('clientReference')}</span>
        <span className="bold">{operationDetails?.clientReference}</span>
      </div>
      <div>
        <span>{t('beneficiaryName')}</span>
        <span className="bold">{operationDetails?.beneficiaryName}</span>
      </div>
      <div>
        <span>{t('beneficiaryBank')}</span>
        <span className="bold">{operationDetails?.beneficiaryBank}</span>
      </div>
      <div>
        <span>{t('applicantOffice')}</span>
        <span className="bold">{request?.customer?.office}</span>
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
        <span className="bold">{operationDetails?.comments || '-'}</span>
      </div>
    </div>
  );
};

export default CliRequestDetailedView;
