export interface ExchangeInsuranceDto {
  buyAmount: string;
  buyCurrency: string;
  exchangeInsuranceId: string;
  exchangeRate: string;
  sellAmount: string;
  sellCurrency: string;
  state?: 'CONFIRMED';
  type: 'FORWARD' | 'TOF' | 'SPOT';
  useAmount: string | null;
  useDate: string;
}
