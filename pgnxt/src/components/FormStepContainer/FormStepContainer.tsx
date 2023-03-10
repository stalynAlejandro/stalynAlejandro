import React from 'react';

import { StepTitle } from '../StepTitle';
import {
  StFormStepContainer,
  StFieldsContainer,
} from './FormStepContainerStyled';

interface FormStepContainerProps {
  centerTitle?: boolean;
  children?: React.ReactNode;
  className?: string;
  stepNumber?: number;
  title: string;
  withLateralContent?: boolean;
}

const FormStepContainer: React.FC<FormStepContainerProps> = ({
  centerTitle,
  children,
  className,
  stepNumber,
  title,
  withLateralContent,
}) => (
  <StFormStepContainer className={className} data-testid="form-step-container">
    <StepTitle
      centerTitle={centerTitle}
      shorterLines={!withLateralContent}
      stepNumber={stepNumber}
      title={title}
    />
    <StFieldsContainer
      className="fields-container"
      withLateralContent={!!withLateralContent}
    >
      <div>{children}</div>
    </StFieldsContainer>
  </StFormStepContainer>
);

FormStepContainer.defaultProps = {
  centerTitle: false,
  children: null,
  className: '',
  stepNumber: undefined,
  withLateralContent: false,
};

export default FormStepContainer;
