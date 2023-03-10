import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';
import { TranslatorType } from '../../../types/TranslatorType';

export interface SummarizeProps<T> {
  (
    formData: Partial<T> | undefined,
    includedSteps?: string[],
    onEditStep?: (stepNumber: number) => void,
    translator?: TranslatorType,
  ): SummaryCardProps;
}

export const keyIsIncluded = (key: string, includedSteps?: string[]): boolean =>
  includedSteps === undefined ||
  includedSteps.length === 0 ||
  includedSteps?.includes(key);
