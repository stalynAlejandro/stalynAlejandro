import React from 'react';

import { StSubtitle } from './StepSubtitleStyled';

interface StepSubtitleProps {
  className?: string;
  subtitle: string;
}

const StepSubtitle: React.FC<StepSubtitleProps> = ({ className, subtitle }) => (
  <StSubtitle className={className} data-testid="step-subtitle">
    {subtitle}
  </StSubtitle>
);

StepSubtitle.defaultProps = {
  className: '',
};

export default StepSubtitle;
