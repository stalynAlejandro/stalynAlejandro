import NumberFormat from 'react-number-format';

import { CreateFormDataDto } from '../../../api/types/cli/request/CreateFormDataDto';
import { CompleteInformationFormDataDto } from '../../../api/types/cli/request/CompleteInformationFormDataDto';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import i18n from '../../../i18n';
import { FileProps } from '../../../types/FileProps';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { keyIsIncluded, SummarizeProps } from './common';

export const summarizeCliRequestCreation: SummarizeProps<
  CreateFormDataDto | CompleteInformationFormDataDto
> = (formData, includedSteps, onEditStep = () => null, t = i18n.t) => {
  const scp: SummaryCardProps = {
    sections: [],
    title: t('summaryTitle'),
  };

  if (!formData) {
    return scp;
  }

  if (keyIsIncluded('customer', includedSteps)) {
    scp.sections.push({
      fields: [
        {
          label: 'client',
          value: formData.customer?.name,
        },
      ],
      key: 'customer',
    });
  }

  if (keyIsIncluded('operationDetails', includedSteps)) {
    scp.sections.push({
      fields: [
        {
          label: 'nominalAccount',
          value: formData.operationDetails?.clientAccount?.iban,
        },
        {
          label: 'commissionAccount',
          value: formData.operationDetails?.commissionAccount?.iban,
        },
        {
          label: 'amount',
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${formData.operationDetails?.collectionCurrency?.currency}`}
              value={formData.operationDetails?.collectionAmount}
            />
          ),
        },
        {
          label: 'collectionType',
          value: formData.operationDetails?.collectionType
            ? t(
                `collectionTypes.${formData.operationDetails?.collectionType}`,
                { ns: 'common' },
              )
            : '-',
        },
        {
          label: 'clientReference',
          value: formData.operationDetails?.clientReference,
        },
        {
          label: t('beneficiaryName'),
          value: formData.operationDetails?.beneficiaryName,
        },
        {
          label: t('beneficiaryBank'),
          value: formData.operationDetails?.beneficiaryBank,
        },
        {
          label: 'applicantOffice',
          value: formData.operationDetails?.office,
        },
        {
          collapsible: true,
          label: 'comments',
          value: formData.operationDetails?.comments,
        },
      ],
      key: 'operationDetails',
      onEdit: () => onEditStep(1),
      title: 'operationDetails',
    });
  }

  if (keyIsIncluded('documentation', includedSteps)) {
    const letterDocumentation =
      formData.documentation?.files?.filter(
        (f: FileProps) => f.documentType === 'letter',
      ) || [];
    const nonLetterDocumentation =
      formData.documentation?.files?.filter(
        (f: FileProps) => f.documentType !== 'letter',
      ) || [];

    scp.sections.push({
      fields: [
        {
          label: 'clientAcceptance',
          value: formData.documentation?.clientAcceptance ? t('yes') : t('no'),
        },
        {
          label: 'acceptanceDoc',
          value: letterDocumentation.length ? t('yes') : t('no'),
        },
        {
          label: 'documentation',
          value: t('nFilesAttached', {
            files: nonLetterDocumentation.length,
          }),
        },
        {
          label: 'priority',
          value: t(formData.documentation?.priority!),
        },
      ],
      key: 'documentation',
      onEdit: () => onEditStep(2),
      title: 'documentationAndPriority',
    });
  }

  return scp;
};
