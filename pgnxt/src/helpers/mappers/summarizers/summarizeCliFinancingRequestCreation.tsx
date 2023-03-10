import NumberFormat from 'react-number-format';

import { CompleteInformationFormDataDto } from '../../../api/types/cli/financingRequest/CompleteInformationFormDataDto';
import { CreateFormDataDto } from '../../../api/types/cli/financingRequest/CreateFormDataDto';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import i18n from '../../../i18n';
import { formatDate } from '../../../utils/dates';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { keyIsIncluded, SummarizeProps } from './common';

export const summarizeCliFinancingRequestCreation: SummarizeProps<
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
          label: 'requestRef',
          value: request?.importCollection?.code,
        },
        {
          label: 'contractRef',
          value: request?.importCollection?.contractReference,
        },
        {
          label: 'requestDate',
          value: request?.importCollection?.creationDate
            ? formatDate(new Date(request.importCollection.creationDate))
            : '-',
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
          label: t('financingAccount'),
          value: formData.request?.account?.iban,
        },
        {
          label: t('financingAmount'),
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${request?.currency.currency}`}
              value={request?.amount}
            />
          ),
        },
        {
          label: t('financingExp'),
          value:
            request?.expirationType === 'days'
              ? t('nDays', {
                  count: Number.parseInt(request.expirationDays, 10),
                  ns: 'common',
                })
              : formatDate(new Date(request?.expirationDate!)),
        },
        {
          label: 'riskLine',
          value: request?.riskLine?.iban,
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
