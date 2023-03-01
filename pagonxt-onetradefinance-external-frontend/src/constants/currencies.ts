import { CurrencyValue } from '../components/Controls/Select/OptionComponents/CurrencyValue';

const availableCurrencies = ['EUR', 'GBP', 'USD'];

export const currencies = availableCurrencies.map((cur) => ({
  component: CurrencyValue,
  value: {
    currency: cur,
    id: cur,
  },
}));
