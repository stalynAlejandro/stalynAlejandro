import React from 'react';

import { StCurrencyContainer, StCurrencyFlag } from './CurrencyStyled';

interface CurrencyProps {
  className?: string;
  currency: string;
  showBorder?: boolean;
  showFlag?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({
  className,
  currency,
  showBorder,
  showFlag,
}) => (
  <StCurrencyContainer
    className={className}
    data-testid="currency"
    showBorder={!!showBorder}
    showFlag={!!showFlag}
  >
    {showFlag && (
      <StCurrencyFlag
        currency={currency}
        data-flag={currency}
        data-testid="currency-flag"
        showBorder={!!showBorder}
      />
    )}
    <span>{currency}</span>
  </StCurrencyContainer>
);

Currency.defaultProps = {
  className: '',
  showBorder: true,
  showFlag: false,
};

export default Currency;
