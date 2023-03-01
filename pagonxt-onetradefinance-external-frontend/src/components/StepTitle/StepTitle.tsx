import React from 'react';
import cx from 'classnames';

import {
  StTitle,
  StStepTitleContainer,
  StTitleContainer,
  StLine,
  StNumber,
} from './StepTitleStyled';

interface StepTitleProps {
  centerTitle?: boolean;
  className?: string;
  shorterLines?: boolean;
  stepNumber?: number;
  title: string;
}

const StepTitle: React.FC<StepTitleProps> = ({
  centerTitle,
  className,
  shorterLines,
  stepNumber,
  title,
}) => (
  <StStepTitleContainer
    className={cx('stepTitle', className)}
    data-testid="step-title"
  >
    <StLine centerTitle={!!centerTitle} isLeft shorterLines={!!shorterLines} />
    <StTitleContainer>
      {stepNumber && <StNumber>{stepNumber}</StNumber>}
      <StTitle className="stepTitle__title">{title}</StTitle>
    </StTitleContainer>
    <StLine isLeft={false} shorterLines={!!shorterLines} />
  </StStepTitleContainer>
);

StepTitle.defaultProps = {
  centerTitle: false,
  className: '',
  shorterLines: false,
  stepNumber: undefined,
};

export default StepTitle;
