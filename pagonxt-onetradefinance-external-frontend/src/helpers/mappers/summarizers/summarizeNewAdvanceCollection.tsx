import NumberFormat from 'react-number-format';

import { CreateFormDataDto } from '../../../api/types/cle/advance/CreateFormDataDto';
import { CompleteInformationFormDataDto } from '../../../api/types/cle/advance/CompleteInformationFormDataDto';
import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import i18n from '../../../i18n';
import { formatDate } from '../../../utils/dates';
import { formatNumber } from '../../../utils/formatNumber';
import { getNumberFormatProps } from '../../../utils/getNumberFormatProps';
import { keyIsIncluded, SummarizeProps } from './common';

export const summarizeNewAdvanceCollection: SummarizeProps<
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
          value: request?.exportCollection?.code,
        },
        {
          label: 'contractRef',
          value: request?.exportCollection?.contractReference,
        },
        {
          label: 'amount',
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${request?.exportCollection?.currency}`}
              value={request?.exportCollection?.amount}
            />
          ),
        },
        {
          label: 'requestDate',
          value: request?.exportCollection?.creationDate
            ? formatDate(new Date(request.exportCollection.creationDate))
            : '-',
        },
        {
          label: 'advanceAmount',
          value: (
            <NumberFormat
              {...getNumberFormatProps()}
              displayType="text"
              suffix={` ${request?.advanceCurrency.currency}`}
              value={request?.advanceAmount}
            />
          ),
        },
        ...(request?.exchangeInsurances?.length
          ? request.exchangeInsurances.map(
              ({
                buyCurrency,
                exchangeInsuranceId,
                exchangeRate,
                useAmount,
              }) => ({
                label: t('exchangeInsuranceIdNShort', {
                  id: exchangeInsuranceId,
                }),
                value: `${formatNumber(exchangeRate, 4)} (${formatNumber(
                  useAmount,
                )} ${buyCurrency})`,
              }),
            )
          : []),
        {
          label: 'expiration',
          value: request?.requestExpiration
            ? formatDate(new Date(request.requestExpiration))
            : '-',
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
