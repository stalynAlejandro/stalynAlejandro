import NumberFormat from 'react-number-format';

import { CreateFormDataDto } from '../../../api/types/cli/modification/CreateFormDataDto';
import { CompleteInformationFormDataDto } from '../../../api/types/cli/modification/CompleteInformationFormDataDto';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import i18n from '../../../i18n';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { keyIsIncluded, SummarizeProps } from './common';

export const summarizeCliModificationCreation: SummarizeProps<
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

  if (keyIsIncluded('request', includedSteps)) {
    const { importCollection } = formData.request || {};

    scp.sections.push({
      fields: [
        {
          label: 'collectionRef',
          value: importCollection?.code,
        },
        {
          label: 'collectionAmount',
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${importCollection?.currency}`}
              value={importCollection?.amount}
            />
          ),
        },
        {
          label: 'issuanceDate',
          value: importCollection?.creationDate
            ? formatDate(new Date(importCollection?.creationDate))
            : '-',
        },
        {
          label: 'applicantOffice',
          value: formData.request?.office,
        },
        {
          collapsible: true,
          label: 'comments',
          value: formData.request?.comments,
        },
      ],
      key: 'request',
      onEdit: () => onEditStep(1),
      title: 'requestDetails',
    });
  }

  if (keyIsIncluded('documentation', includedSteps)) {
    scp.sections.push({
      fields: [
        {
          label: 'documentation',
          value: t('nFilesAttached', {
            files: formData.documentation?.files?.length,
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
