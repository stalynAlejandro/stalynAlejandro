import NumberFormat from 'react-number-format';

import { CompleteInformationFormDataDto } from '../../../api/types/cli/otherOperations/CompleteInformationFormDataDto';
import { CreateFormDataDto } from '../../../api/types/cli/otherOperations/CreateFormDataDto';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import i18n from '../../../i18n';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { keyIsIncluded, SummarizeProps } from './common';

export const summarizeCliOtherOperationsCreation: SummarizeProps<
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
    const { request } = formData;

    scp.sections.push({
      fields: [
        {
          label: 'operationType',
          value: request?.operationType
            ? t(`operationTypes.${request?.operationType}`, { ns: 'common' })
            : '',
        },
        {
          label: 'requestRef',
          value: request?.importCollection?.code,
        },
        {
          label: 'contractRef',
          value: request?.importCollection?.contractReference,
        },
        {
          label: 'amount',
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${request?.importCollection?.currency}`}
              value={request?.importCollection?.amount}
            />
          ),
        },
        {
          label: 'requestDate',
          value: request?.importCollection?.creationDate
            ? formatDate(new Date(request.importCollection.creationDate))
            : '-',
        },
        {
          label: 'office',
          value: request?.office,
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
