import React from 'react';
import { OptionContext } from 'react-select';

import { StCurrency } from './DefaultValueStyled';

export interface DefaultValueProps {
  context: OptionContext;
  label: string;
  showCurrency?: boolean;
  value: any;
}

const DefaultValue: React.FC<DefaultValueProps> = ({
  context,
  label,
  showCurrency,
  value,
}) => (
  <>
    <div className="option__label">
      <span>{label}</span>
    </div>
    {showCurrency && value?.currency && (
      <StCurrency context={context} currency={value.currency} showFlag />
    )}
  </>
);

DefaultValue.defaultProps = {
  showCurrency: true,
};

export default DefaultValue;
