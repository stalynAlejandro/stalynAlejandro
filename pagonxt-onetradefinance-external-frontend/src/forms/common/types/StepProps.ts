import { SummaryCardProps } from '../../../components/SummaryCard/SummaryCard';

export interface StepProps {
  formData: any;
  initialData?: any;
  onDataChange: (data: any) => void;
  onSaveDraft?: (userTriggered?: boolean) => any;
  onStepChange?: (step: number) => void;
  onSubmitStep: () => void;
  onSummarizeFormData?: (includedSteps?: string[]) => SummaryCardProps;
  onUpdateFormData: (formData: any) => void;
  stepNumber?: number;
}

export const stepDefaultProps = {
  initialData: {},
  onStepChange: undefined,
  onSummarizeFormData: undefined,
  stepNumber: undefined,
};
