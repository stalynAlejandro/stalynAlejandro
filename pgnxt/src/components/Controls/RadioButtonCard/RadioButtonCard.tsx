import React from 'react';
import cx from 'classnames';

import RadioButton, { RadioButtonProps } from '../RadioButton/RadioButton';
import { StRadioButtonCard, StDescription } from './RadioButtonCardStyled';

export interface RadioButtonCardProps extends RadioButtonProps {
  className?: string;
  description?: string;
}

const RadioButtonCard: React.FC<RadioButtonCardProps> = ({
  checked,
  className,
  description,
  ...rest
}) => (
  <StRadioButtonCard
    className={cx(className, 'form-field')}
    data-testid="radio-button-card"
    isChecked={!!checked}
  >
    <RadioButton checked={checked} {...rest} />
    <StDescription>{description}</StDescription>
  </StRadioButtonCard>
);

RadioButtonCard.defaultProps = {
  className: '',
  description: '',
};

export default RadioButtonCard;
