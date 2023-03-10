import React from 'react';

import { Currency } from '../../../../Currency';

interface CurrencyValueProps {
  value: {
    currency: string;
  };
}

const CurrencyValue: React.FC<CurrencyValueProps> = ({ value }) => (
  <Currency currency={value.currency} showBorder={false} showFlag />
);

export default CurrencyValue;
